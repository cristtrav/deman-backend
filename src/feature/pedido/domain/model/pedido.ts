import { Temporal } from "@js-temporal/polyfill";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { Cliente } from "./cliente";

export class Pedido {
    private _id: number;
    private _fechaPedido: Temporal.PlainDate;
    private _fechaConfirmacion: Temporal.PlainDate;
    private _fechaEntrega: Temporal.PlainDate;
    private _fechaEntregado?: Temporal.PlainDate;
    private _confirmado: boolean;
    private _entregado: boolean;
    private _cliente: Cliente;
    private _total: number;
    private _descripcion: string;
    private _saldo: number;
    private _tienePagos: boolean;

    constructor(
        id: number,
        fechaPedido: Temporal.PlainDate,
        fechaConfirmacion: Temporal.PlainDate,
        fechaEntrega: Temporal.PlainDate,
        fechaEntregado: Temporal.PlainDate | null | undefined,
        confirmado: boolean,
        entregado: boolean,
        cliente: Cliente,
        total: number,
        descripcion: string,
        saldo: number,
        tienePagos: boolean = false,
    ){
        this._id = id;
        this._fechaPedido = fechaPedido;
        this._fechaConfirmacion = fechaConfirmacion;
        this._fechaEntrega = fechaEntrega;
        this._fechaEntregado = fechaEntregado ?? undefined;
        this._confirmado = confirmado;
        this._entregado = entregado;
        this._cliente = cliente;
        this._total = total;
        this._descripcion = descripcion;
        this._saldo = saldo;
        this._tienePagos = tienePagos;
    }

    get id(): number { return this._id }
    get fechaPedido(): Temporal.PlainDate { return this._fechaPedido }
    get fechaConfirmacion(): Temporal.PlainDate { return this._fechaConfirmacion }
    get fechaEntrega(): Temporal.PlainDate { return this._fechaEntrega }
    get fechaEntregado(): Temporal.PlainDate | undefined { return this._fechaEntregado }
    get confirmado(): boolean { return this._confirmado }
    get entregado(): boolean { return this._entregado }
    get cliente(): Cliente { return this._cliente }
    get total(): number { return this._total }
    get descripcion(): string { return this._descripcion }
    get saldo(): number { return this._saldo }
    get totalPagado(): number { return this._total - this._saldo }
    /** Indica si el pedido tiene pagos registrados, incluidos los anulados. */
    get tienePagos(): boolean { return this._tienePagos }

    /**
     * El total no puede cambiar una vez registrado un pago: los recibos emitidos
     * tienen fijados sus saldos a partir de ese total.
     */
    validarCambioDeTotal(nuevoTotal: number): void {
        if(this._tienePagos && Number(nuevoTotal) != Number(this._total))
            throw new BusinessRuleException(`El pedido «${this._id}» ya tiene pagos registrados, no se puede modificar su total`);
    }

    /**
     * Saldo que tendría el pedido con un nuevo total, conservando lo ya pagado.
     */
    calcularSaldo(nuevoTotal: number): number {
        return nuevoTotal - this.totalPagado;
    }    
}