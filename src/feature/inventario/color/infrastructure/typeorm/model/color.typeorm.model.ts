import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'inventario', name:'color'})
export class ColorTypeORMModel {
    @PrimaryGeneratedColumn({name: 'id'})
        id: number
    
        @Column({name: 'descripcion'})
        descripcion: string
    
        @Column({name: 'eliminado'})
        eliminado: boolean
}