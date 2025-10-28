import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ColorTypeORMModel } from "./color.typeorm.model";
import { TamanioTypeORMModel } from "./tamanio.typeorm.model";

@Entity({schema: 'inventario', name: 'variante'})
export class VarianteTypeORMModel{
    @PrimaryColumn()
    id: number;

    @Column({name: 'descripcion', length: 100})
    descripcion: string;

    @ManyToOne(() => ColorTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_color'})
    color: ColorTypeORMModel;

    @ManyToOne(() => TamanioTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_tamanio'})
    tamanio: TamanioTypeORMModel;
}