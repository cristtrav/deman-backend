import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Color } from "./color";
import { Tamanio } from "./tamanio";

export class Variante {
    private _id: number;
    private _descripcion?: string;
    private _color: Color;
    private _tamanio: Tamanio;

    constructor(id: number, color: Color, tamanio: Tamanio, descripcion?: string){
        if(id == null) throw new RequiredFieldException('Variante', 'id');
        if(color == null) throw new RequiredFieldException("Variante", "color");
        if(tamanio == null) throw new RequiredFieldException('Variante', 'tamanio');
        this._id = id;
        this._descripcion = descripcion;
        this._color = color;
        this._tamanio = tamanio;
    }

    get id(): number { return this._id }
    get descripcion(): string | undefined { return this._descripcion }
    get color(): Color { return this._color }
    get tamanio(): Tamanio { return this._tamanio }

    set id(value: number) { 
        if(value == null) throw new RequiredFieldException('Variante', 'id');
        this._id = value;
    }
    set descripcion(value: string | undefined){
        this._descripcion = value;
    }
    set color(val: Color){
        if(val == null) throw new RequiredFieldException("Variante", "color");
        this._color = val;
    }
    set tamanio(val: Tamanio){
        if(val == null) throw new RequiredFieldException('Variante', 'tamanio');
        this._tamanio = val;
    }
}