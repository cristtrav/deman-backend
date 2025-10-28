import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { NewDetalleInventario } from "./new-detalle-inventario";

export class NewInventario {
    private _fecha: Date;
    private _detalles: NewDetalleInventario[]

    constructor(fecha: Date, id?: number){
        if(fecha == null) throw new RequiredFieldException('Inventario', 'fecha')
        this._fecha = fecha;
        this._detalles = [];
    }

    get fecha(): Date { return this._fecha }
    set fecha(value: Date){ this._fecha = value }

    get detalles(): ReadonlyArray<NewDetalleInventario>{
        return this._detalles.map(d => d.clone());
    }

    agregarDetalle(detalle: NewDetalleInventario){
        this._detalles.push(detalle);
    }

    agregarDetalles(detalles: NewDetalleInventario[]){
        detalles.forEach(d => this.agregarDetalle(d));
    }
    
}