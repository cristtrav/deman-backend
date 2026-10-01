import { Temporal } from "@js-temporal/polyfill";
import { Pedido } from "./pedido";
import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { FieldValidationException } from "@core/domain/exception/field-validation.exception";

export class NewPago {
    private _pedido: Pedido;
    private _fecha: Temporal.PlainDate;
    private _monto: number;

    constructor(
        pedido: Pedido,
        fecha: Temporal.PlainDate,
        monto: number
    ){
        if(pedido == null) throw new RequiredFieldException("Pago", "pedido");
        if(fecha == null) throw new RequiredFieldException("Pago", "fecha");
        if(monto == null) throw new RequiredFieldException("Pago", "monto");
        if(monto <= 0) throw new FieldValidationException("Pago", "monto", "debe ser mayor a cero", monto);
        this._pedido = pedido;
        this._fecha = fecha;
        this._monto = monto;
    }

    get pedido(): Pedido { return this._pedido }
    get fecha(): Temporal.PlainDate { return this._fecha }
    get monto(): number { return this._monto }
}
