import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({schema: 'inventario', name:'tipo'})
export class TipoTypeORMModel {
    @PrimaryGeneratedColumn({name: 'id'})
        id: number
    
        @Column({name: 'descripcion'})
        descripcion: string
    
        @Column({name: 'eliminado'})
        eliminado: boolean
}