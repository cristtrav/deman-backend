import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ schema: 'inventario', name: 'marca' })
export class MarcaTypeORMModel{
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'descripcion'})
    descripcion: string

    @Column({name: 'eliminado'})
    eliminado: boolean
}