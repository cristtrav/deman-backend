import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Cliente } from "./cliente";
import { NumeroFactura } from "../value/numero-factura";
import { TotalVenta } from "../value/total-venta";
import { TotalIvaVenta } from "../value/total-iva-venta";
import { DetalleVenta } from "./detalle-venta";

export class NewVenta {    
    private _fecha: Date;
    private _esCredito: boolean;
    private _estaCancelado: boolean;
    private _cliente: Cliente;
    private _total: TotalVenta;
    private _totalIva: TotalIvaVenta;
    private _totalEntrega: number;

    private _numeroFactura?: NumeroFactura;
    private _fechaCancelacion?: Date;

    private _detalles: DetalleVenta[];

    constructor(
        fecha: Date,
        esCredito: boolean,
        estaCancelado: boolean,
        cliente: Cliente,
        total: TotalVenta,
        totalIva: TotalIvaVenta,
        numeroFactura?: NumeroFactura,
        fechaCancelacion?: Date,
        totalEntrega: number = 0,
        detalles: DetalleVenta[] = []
    ){
        if(fecha == null) throw new RequiredFieldException('Venta', 'fecha');
        if(esCredito == null) throw new RequiredFieldException('Venta', 'esCredito');
        if(estaCancelado == null) throw new RequiredFieldException('Venta', 'estaCancelado');
        if(cliente == null) throw new RequiredFieldException('Venta', 'cliente');
        if(total == null) throw new RequiredFieldException('Venta', 'total');
        if(totalIva == null) throw new RequiredFieldException('Venta', 'totalIva');
        if(totalEntrega == null) throw new RequiredFieldException('Venta', 'totalEntrega');
        if(detalles == null) throw new RequiredFieldException('Venta', 'detalles');

        this._fecha = fecha;
        this._esCredito = esCredito;
        this._estaCancelado = estaCancelado;
        this._cliente = cliente;
        this._total = total;
        this._totalIva = totalIva;
        this._totalEntrega = totalEntrega;

        this._numeroFactura = numeroFactura;
        this._fechaCancelacion = fechaCancelacion;

        this.agregarDetalles(detalles);
    }

    get fecha(): Date { return this._fecha }
    get esCredito(): boolean { return this._esCredito }
    get estaCancelado(): boolean { return this._estaCancelado }
    get cliente(): Cliente { return this._cliente }
    get numeroFactura(): NumeroFactura | undefined { return this._numeroFactura }
    get total(): TotalVenta { return this._total }
    get totalIva(): TotalIvaVenta { return this._totalIva }
    get fechaCancelacion(): Date | undefined { return this._fechaCancelacion }
    get totalEntrega(): number { return this._totalEntrega }

    get detalles(): ReadonlyArray<DetalleVenta>{
        return this.detalles.map(d => d.clone());
    }

    agregarDetalle(detalle: DetalleVenta){
        this._detalles.push(detalle);
    }

    agregarDetalles(detalles: DetalleVenta[]){
        detalles.forEach(detalle => this.agregarDetalle(detalle));
    }
}