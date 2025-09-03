import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'inventario', name: 'categoria'})
export class CategoriaTypeORMModel {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT' })
    id: number;

    @Column({length: 50, nullable: false})
    descripcion: string;

    @Column({nullable: false, default: false})
    eliminado: boolean;
}