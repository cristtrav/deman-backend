import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { VarianteTypeORMModel } from "./variante.typeorm.model";

@Entity({schema: 'inventario', name: 'color'})
export class ColorTypeORMModel{
    @PrimaryColumn()
    id: number;

    @Column({name: 'descripcion', length: 20, nullable: false})
    descripcion: string;
}