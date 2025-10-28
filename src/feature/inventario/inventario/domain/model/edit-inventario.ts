import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { DetalleInventario } from "./detalle-inventario";
import { NewDetalleInventario } from "./new-detalle-inventario";

export class EditInventario {
    private _id: number;
    private _fecha: Date;
    private _detalles: (DetalleInventario | NewDetalleInventario)[]

    constructor(id: number, fecha: Date){
        if(id == null) throw new RequiredFieldException('Inventario', 'id');
        if(fecha == null) throw new RequiredFieldException('Inventario', 'fecha')
        this._id = id;
        this._fecha = fecha;
        this._detalles = [];
    }

    get id(): number { return this._id }
    get fecha(): Date { return this._fecha }

    set id(value: number){ this._id = value }
    set fecha(value: Date){ this._fecha = value }

    get detalles(): ReadonlyArray<DetalleInventario | NewDetalleInventario>{
        return this._detalles.map(d => d.clone());
    }

    agregarDetalle(detalle: DetalleInventario | NewDetalleInventario){
        this._detalles.push(detalle);
    }

    agregarDetalles(detalles: (DetalleInventario | NewDetalleInventario)[]){
        detalles.forEach(d => this.agregarDetalle(d));
    }
    
}