import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'inventario', name: 'categoria'})
export class CategoriaTypeORMModel {

    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT'})
    id: number;

    @Column({nullable: false, length: 50})
    descripcion: string;

    @Column({nullable: false, default: false})
    eliminado: boolean;

}