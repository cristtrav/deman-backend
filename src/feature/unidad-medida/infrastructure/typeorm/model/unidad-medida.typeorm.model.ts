import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'public', name: 'unidad_medida'})
export class UnidadMedidaTypeORMModel{
    @PrimaryColumn({ length: 3 })
    id: string

    @Column({ name: 'descripcion_singular', length: 20, nullable: false })
    descripcionSingular: string;

    @Column({ name: 'descripcion_plural', length: 20, nullable: false })
    descripcionPlural: string;

    @Column({ name: 'abreviatura_singular', length: 5, nullable: false })
    abreviaturaSingular: string;

    @Column({ name: 'abreviatura_plural', length: 5, nullable: false })
    abreviaturaPlural: string;
}