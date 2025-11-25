import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { InventarioTypeORMModel } from "./inventario.typeorm.model";
import { ProductoTypeORMModel } from "./producto.typeorm.model";
import { VarianteTypeORMModel } from "./variante.typeorm.model";

@Entity({schema: 'inventario', name: 'inventario_detalle'})
export class DetalleInventarioTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT' })
    id: number;

    @Column({name: 'id_inventario', nullable: false})
    idInventario: number;

    @Column({name: 'id_producto', nullable: false})
    idProducto: number;

    @Column({name: 'id_variante', nullable: false})
    idVariante: number;

    @Column({name: 'cantidad', nullable: false, scale: 6, precision: 2})
    cantidad: string;

    @Column({name: 'cantidad_previa', nullable: false, scale: 6, precision: 2})
    cantidadPrevia: string;

    @Column({name: 'eliminado', nullable: false, default: false})
    eliminado: boolean;

    @ManyToOne(
        () => InventarioTypeORMModel,
        inventario => inventario.detalleInventario,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({name: 'id_inventario'})
    inventario: InventarioTypeORMModel;

    @ManyToOne(() => ProductoTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_producto'})
    producto: ProductoTypeORMModel;

    @ManyToOne(() => VarianteTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_variante'})
    variante: VarianteTypeORMModel;
}