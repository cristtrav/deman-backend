import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'inventario', name: 'color'})
export class ColorTypeORMModel{
    @PrimaryColumn()
    id: number;

    @Column({name: 'descripcion', length: 20, nullable: false})
    descripcion: string;
}