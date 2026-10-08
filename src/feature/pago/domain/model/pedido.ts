import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import type { Pago } from "./pago";
import { Cliente } from "./cliente";

export class Pedido {
    public readonly id: number;
    public readonly cliente: Cliente;
    private _total: number;
    private _saldo: number;

    public constructor(id: number, cliente: Cliente, total: number, saldo: number){
        if(id == null) throw new RequiredFieldException("Pedido", "id");
        if(cliente == null) throw new RequiredFieldException("Pedido", "cliente");
        if(total == null) throw new RequiredFieldException("Pedido", "total");
        this.id = id;
        this.cliente = cliente;
        this._total = total;
        this._saldo = saldo ?? total;
    }

    get total(): number { return this._total }
    get saldo(): number { return this._saldo }

    /**
     * Recalcula el saldo del pedido: total - suma de los pagos vigentes.
     */
    actualizarSaldo(pagos: Pago[]): void {
        const pagoAjeno = pagos.find(pago => pago.pedido.id != this.id);
        if(pagoAjeno) throw new BusinessRuleException(`El pago «${pagoAjeno.id}» no pertenece al pedido «${this.id}»`);
        const totalPagado = pagos.reduce((total, pago) => total + Number(pago.monto), 0);
        this._saldo = Number(this._total) - totalPagado;
    }
}
