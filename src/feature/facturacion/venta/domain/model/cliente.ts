import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Cliente {
    private _id: number;
    private _razonSocial;

    constructor(id: number, razonSocial: string){
        if(id == null) throw new RequiredFieldException('Cliente', 'id');
        if(razonSocial == null) throw new RequiredFieldException('Cliente', 'razonSocial');

        this._id = id;
        this._razonSocial = razonSocial;
    }

    get id(): number { return this._id }
    get razonSocial(): string { return this._razonSocial }

}