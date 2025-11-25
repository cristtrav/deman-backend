import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Color {
    private _id: number;
    private _descripcion: string;

    constructor(id: number, descripcion: string){
        if(id == null) throw new RequiredFieldException("Color", "id");
        if(descripcion == null) throw new RequiredFieldException("Color", "descripcion");

        this._id = id;
        this._descripcion = descripcion;
    }

    get id(): number { return this._id }
    get descripcion(): string { return this._descripcion }

    set id(val: number) {
        if(val == null) throw new RequiredFieldException("Color", "id");
        this._id = val;
    }
    set descripcion(val: string){
        if(val == null) throw new RequiredFieldException("Color", "descripcion");
        this._descripcion = val;
    }
}