import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class NewCliente {
    private _razonSocial: string;
    private _ruc: string;
    private _telefono: string;
    private _id?: number

    constructor(
        razonSocial: string,
        ruc: string,
        telefono: string,
        id?: number
    ) {
        if (razonSocial == null) throw new RequiredFieldException('Cliente', 'razonSocial')
        this._razonSocial = razonSocial;
        this._ruc = ruc;
        this._telefono = telefono;
        this._id = id
    }

    get id(): number | undefined { return this._id }
    get razonSocial(): string { return this._razonSocial }
    get ruc(): string { return this._ruc }
    get telefono(): string { return this._telefono }
}