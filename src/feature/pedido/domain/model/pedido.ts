import { Temporal } from "@js-temporal/polyfill";
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
}