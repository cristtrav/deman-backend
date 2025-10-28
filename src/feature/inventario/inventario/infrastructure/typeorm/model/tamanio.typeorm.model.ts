import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'inventario', name: 'tamanio'})
export class TamanioTypeORMModel {
    @PrimaryColumn()
    id: number;

    @Column({name: 'descripcion', length: 20, nullable: false})
    descripcion: string;
}