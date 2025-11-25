import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductoTypeORMModel } from "./producto.typeorm.model";
import { VarianteTypeORMModel } from "./variante.typeorm.model";

@Entity({schema: 'inventario', name: 'producto_variante'})
export class ProductoVarianteTypeORMModel {
    @PrimaryColumn({name: 'id_producto'})
    idproducto: number

    @PrimaryColumn({name: 'id_variante'})
    idvariante: number

    @ManyToOne(() => ProductoTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_producto'})
    producto: ProductoTypeORMModel

    @ManyToOne(() => VarianteTypeORMModel, { eager: true })
    @JoinColumn({name: 'id_variante'})
    variante: VarianteTypeORMModel
}