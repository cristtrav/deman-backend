import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    schema: 'inventario',
    name: 'vw_productos',
    expression: 'SELECT * FROM inventario.vw_productos'
})
export class ProductoReadTypeORMModel{

    @ViewColumn()
    id: number;

    @ViewColumn()
    descripcion: string;

    @ViewColumn()
    precio: string;

    @ViewColumn()
    idmarca: number;

    @ViewColumn()
    marca: string;

    @ViewColumn({name: 'id_tipo'})
    idtipo: number;

    @ViewColumn()
    tipo: string;

    @ViewColumn({name: 'id_categoria'})
    idcategoria: number;

    @ViewColumn()
    categoria: string;

    @ViewColumn({name: 'id_unidad_medida'})
    idunidadMedida: number;

    @ViewColumn({name: 'unidad_medida_singular'})
    unidadMedidaSingular: string;

    @ViewColumn({name: 'unidad_medida_plural'})
    unidadMedidaPlural: string;

    @ViewColumn({name: 'unidad_medida_abr_singular'})
    unidadMedidaAbrSingular: string;

    @ViewColumn({name: 'unidad_medida_abr_plural'})
    unidadMedidaAbrPlural: string;

}