import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UnidadMedidaTypeORMModel } from "./unidad-medida.typeorm.model";

@Entity({schema: 'inventario', name: 'producto'})
export class ProductoTypeORMModel {
    @PrimaryColumn()
    id: number;

    @Column({name: 'descripcion', length: '100', nullable: false})
    descripcion: string;

    @ManyToOne(() => UnidadMedidaTypeORMModel, { eager: true })
    @JoinColumn({ name: 'unidad_medida'})
    unidadMedida: UnidadMedidaTypeORMModel;
}