import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'inventario', name: 'stock'})
export class StockTypeORMModel {
    @PrimaryColumn({name: 'id_deposito'})
    idDeposito: number;

    @PrimaryColumn({name: 'id_producto'})
    idProducto: number;

    @PrimaryColumn({name: 'id_variante'})
    idVariante: number;

    @Column({name: 'cantidad', nullable: false, scale: 6, precision: 2, default: 0})
    cantidad: string;

    @Column({name: 'ultima_actualizacion', nullable: false, type: 'date'})
    ultimaActualizacion: Date;

    @Column({name: 'cantidad_minima', nullable: false, scale: 6, precision: 2})
    cantidadMinima: string;
}