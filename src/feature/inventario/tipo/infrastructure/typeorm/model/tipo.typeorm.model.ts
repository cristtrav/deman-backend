import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ schema: 'inventario', name: 'tipo' })
export class TipoTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT' })
    id: number

    @Column({ nullable: false, name: 'descripcion' })
    descripcion: string

    @Column({ nullable: false, name: 'eliminado' })
    eliminado: boolean
}