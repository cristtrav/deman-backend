import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Cliente {
    private _id: number;
    private _razonSocial: string;
    private _ruc: string;
    private _telefono: string;

    constructor(
        id: number,
        razonSocial: string,
        ruc: string,
        telefono: string
    ) {
        if (id == null) throw new RequiredFieldException('Cliente', 'id')
        if (razonSocial == null) throw new RequiredFieldException('Cliente', 'razonSocial')
        this._id = id;
        this._razonSocial = razonSocial;
        this._ruc = ruc;
        this._telefono = telefono;
    }

    get id(): number {return this._id}
    get razonSocial(): string {return this._razonSocial}
    get ruc(): string {return this._ruc}
    get telefono(): string {return this._telefono}
}