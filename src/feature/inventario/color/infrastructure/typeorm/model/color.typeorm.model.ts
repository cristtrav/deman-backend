import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'inventario', name: 'color' })
export class ColorTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT'})
    id: number

    @Column({ nullable: false, name: 'descripcion' })
    descripcion: string

    @Column({ nullable: false, name: 'eliminado', default: false })
    eliminado: boolean
}