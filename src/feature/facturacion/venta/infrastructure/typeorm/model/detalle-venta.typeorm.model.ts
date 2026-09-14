import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'facturacion', name: 'venta_detalle'})
export class DetalleVentaTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT' })
    id: number;

    @Column({name: 'id_venta', nullable: false})
    idVenta: number;

    @Column({name: 'id_producto', nullable: false})
    idProducto: number;

    @Column({name: 'cantidad', nullable: false, scale: 6, precision: 2, type: 'numeric'})
    cantidad: string;

    @Column({name: 'precio', nullable: false, scale: 9, precision: 0, type: 'numeric'})
    precio: string;

    @Column({name: 'subtotal', nullable: false, scale: 9, precision: 0, type: 'numeric'})
    subtotal: string;

    @Column({name: 'id_variante', nullable: false})
    idVariante: number;

}