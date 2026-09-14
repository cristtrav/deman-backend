import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClienteTypeORMModel } from "./cliente.typeorm.mapper";

@Entity({schema: 'facturacion', name: 'venta'})
export class VentaTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT' })
    id: number;

    @Column({name: 'fecha', type: 'date', nullable: false})
    fecha: string;

    @Column({name: 'id_cliente', nullable: false})
    idCliente: number;

    @Column({name: 'nro_factura'})
    nroFactura: string;

    @Column({name: 'credito', nullable: false, default: false})
    credito: boolean;

    @Column({name: 'total', nullable: false, type: 'numeric', scale: 9, precision: 0})
    total: string;

    @Column({name: 'total_descuento', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalDescuento: string;

    @Column({name: 'total_interes', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalInteres: string;

    @Column({name: 'total_final', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalFinal

    @Column({name: 'total_iva_10', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalIva10: string;

    @Column({name: 'total_iva_5', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalIva5: string;

    @Column({name: 'total_exento', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalExento: string;

    @Column({name: 'cancelado', nullable: false, default: true})
    cancelado: boolean;

    @Column({name: 'fecha_cancelacion', type: 'date'})
    fechaCancelacion: string;

    @Column({name: 'total_entrega', nullable: false, type: 'numeric', scale: 9, precision: 0})
    totalEntrega: string;

    @Column({name: 'id_pedido'})
    idPedido: number;

    @Column({name: 'eliminado', nullable: false, default: false})
    eliminado: boolean;

    @ManyToOne(() => ClienteTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_cliente'})
    cliente: ClienteTypeORMModel
}