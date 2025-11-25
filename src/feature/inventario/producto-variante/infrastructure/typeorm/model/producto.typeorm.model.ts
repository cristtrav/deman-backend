import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MarcaTypeORMModel } from "./marca.typeorm.model";
import { TipoTypeORMModel } from "./tipo.typeorm.model";
import { CategoriaTypeORMModel } from "./categoria.typeorm.model";
import { UnidadMedidaTypeORMModel } from "./unidad-medida.typeorm.model";

@Entity({ schema: 'inventario', name: 'producto' })
export class ProductoTypeORMModel {

    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'BY DEFAULT'})
    id: number;

    @Column({length: 100, nullable: false})
    descripcion: string;

    @Column({nullable: false, default: '0', type: 'decimal', scale: 9, precision: 0})
    precio: string;

    @Column({name: 'id_marca', nullable: false})
    idMarca: number;

    @Column({name: 'id_tipo', nullable: false})
    idTipo: number;

    @Column({name: 'id_categoria', nullable: false})
    idCategoria: number;

    @Column({name: 'unidad_medida', nullable: false})
    idUnidadMedida: string;

    @Column({nullable: false, default: false})
    eliminado: boolean;

    @ManyToOne(() => MarcaTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_marca'})
    marca: MarcaTypeORMModel;

    @ManyToOne(() => TipoTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_tipo'})
    tipo: TipoTypeORMModel;

    @ManyToOne(() => CategoriaTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_categoria'})
    categoria: CategoriaTypeORMModel;

    @ManyToOne(() => UnidadMedidaTypeORMModel, { eager: true })
    @JoinColumn({name: 'unidad_medida'})
    unidadMedida: UnidadMedidaTypeORMModel
}