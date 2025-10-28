import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleInventarioTypeORMModel } from "./detalle-inventario.typeorm.model";

@Entity({schema: 'inventario', name: 'inventario'})
export class InventarioTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT'})
    id: number;

    @Column({name: 'fecha', type: 'date', nullable: false})
    fecha: string;

    @Column({name: 'eliminado', nullable: false, default: false})
    eliminado: boolean;

    @OneToMany(
        () => DetalleInventarioTypeORMModel,
        detalle => detalle.inventario,
        { cascade: true, eager: true }
    )
    detalleInventario: DetalleInventarioTypeORMModel[]
}