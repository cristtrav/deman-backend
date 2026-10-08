import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { FieldValidationException } from "@core/domain/exception/field-validation.exception";
import { Ruc } from "./ruc";

/**
 * Datos de la empresa que emite los comprobantes. Existe un único registro.
 * El RUC es opcional porque por ahora solo se emiten recibos internos.
 */
export class Empresa {
    public readonly nombre: string;
    public readonly direccion?: string;
    public readonly ruc?: string;
    public readonly telefono?: string;

    constructor(nombre: string, direccion?: string | null, ruc?: string | null, telefono?: string | null){
        const nombreLimpio = Empresa.limpiar(nombre);
        if(nombreLimpio == null) throw new RequiredFieldException("Empresa", "nombre");
        this.nombre = Empresa.validarLargo("nombre", nombreLimpio, 100);
        this.direccion = Empresa.validarLargo("direccion", Empresa.limpiar(direccion), 200);
        const rucLimpio = Empresa.limpiar(ruc);
        this.ruc = rucLimpio != null ? new Ruc(rucLimpio, "Empresa").valor : undefined;
        this.telefono = Empresa.validarLargo("telefono", Empresa.limpiar(telefono), 20);
    }

    // Los campos opcionales vacíos se guardan como ausentes, no como cadenas vacías
    private static limpiar(valor?: string | null): string | undefined {
        const limpio = valor?.trim();
        return limpio ? limpio : undefined;
    }

    private static validarLargo<T extends string | undefined>(campo: string, valor: T, maximo: number): T {
        if(valor != null && valor.length > maximo)
            throw new FieldValidationException("Empresa", campo, `no puede superar los ${maximo} caracteres`, valor);
        return valor;
    }
}
