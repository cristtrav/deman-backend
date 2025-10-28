import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'public', name: 'unidad_medida'})
export class UnidadMedidaTypeORMModel{
    @PrimaryColumn({length: 3})
    id: string;

    @Column({name: 'descripcion_singular', nullable: false, length: 50})
    descripcionSingular: string;

    @Column({name: 'descripcion_plural', nullable: false, length: 50})
    descripcionPlural: string;

    @Column({name: 'abreviatura_singular', nullable: false, length: 5})
    abreviaturaSingular: string;

    @Column({name: 'abreviatura_plural', nullable: false, length: 5})
    abreviaturaPlural: string;
}