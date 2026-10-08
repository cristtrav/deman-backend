import { Temporal } from "@js-temporal/polyfill";
import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { DatosRecibo, validarDatosRecibo } from "./datos-recibo";

export interface AnulacionRecibo {
    fecha: Temporal.Instant;
    motivo: string;
}

export class Recibo {
    public readonly id: number;
    public readonly datos: DatosRecibo;
    private _anulacion?: AnulacionRecibo;

    public constructor(id: number, datos: DatosRecibo, anulacion?: AnulacionRecibo){
        if(id == null) throw new RequiredFieldException("Recibo", "id");
        validarDatosRecibo(datos);
        this.id = id;
        this.datos = datos;
        this._anulacion = anulacion;
    }

    get numero(): number { return this.datos.numero }
    get monto(): number { return this.datos.monto }
    get anulacion(): AnulacionRecibo | undefined { return this._anulacion }
    get anulado(): boolean { return this._anulacion != null }

    anular(motivo: string, fecha: Temporal.Instant): void {
        if(this.anulado) throw new BusinessRuleException(`El recibo Nº ${this.numero} ya está anulado`);
        const motivoLimpio = motivo?.trim();
        if(!motivoLimpio) throw new RequiredFieldException("Recibo", "motivo de anulación");
        if(fecha == null) throw new RequiredFieldException("Recibo", "fecha de anulación");
        this._anulacion = { fecha, motivo: motivoLimpio };
    }
}
