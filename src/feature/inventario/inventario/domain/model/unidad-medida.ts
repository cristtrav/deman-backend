import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

interface Conjugacion{
    singular: string;
    plural: string;
}

export class UnidadMedida {
    private _id: string;
    private _descripcion: Conjugacion;
    private _abreviatura: Conjugacion;

    constructor(
        id: string,
        descripcionSingular: string,
        descripcionPlural: string,
        abreviaturaSingular: string,
        abreviaturaPlural: string
    ){
        if(id == null) throw new RequiredFieldException('UnidadMedida', 'id');
        if(descripcionSingular == null) throw new RequiredFieldException('UnidadMedida', 'descripcionSingular');
        if(descripcionPlural == null) throw new RequiredFieldException('UnidadMedida', 'descripcionPlural');
        if(abreviaturaSingular == null) throw new RequiredFieldException('UnidadMedida', 'abreviaturaSingular');
        if(abreviaturaPlural == null) throw new RequiredFieldException('UnidadMedida', 'abreviaturaPlural');

        this._id = id;
        this._descripcion = { singular: descripcionSingular, plural: descripcionPlural };
        this._abreviatura = { singular: abreviaturaSingular, plural: abreviaturaPlural };
    }

    get id(): string { return this._id }
    get descripcion(): Conjugacion { return this._descripcion }
    get abreviatura(): Conjugacion { return this._abreviatura }
}