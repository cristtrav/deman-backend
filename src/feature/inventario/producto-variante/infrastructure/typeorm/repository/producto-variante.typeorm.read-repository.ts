import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import { ProductoVarianteReadRepository } from "@feature/inventario/producto-variante/application/read-repository/producto-variante.read-repository";
import { ProductoVariante } from "@feature/inventario/producto-variante/domain/model/produdcto-variante";
import PRODUCTO_VARIANTE_MAP from "../mapping/producto-variante.typeorm.mapping";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoVarianteTypeORMModel } from "../model/producto-variante.typeorm.model";
import { Repository } from "typeorm";
import { ProductoVarianteTypeORMMapper } from "../mapper/producto-variante.typeorm.mapper";

export class ProductoVarianteTypeORMReadRepository implements ProductoVarianteReadRepository {
    
    constructor(
        @InjectRepository(ProductoVarianteTypeORMModel)
        private productoVarianteTypeOrmRepo: Repository<ProductoVarianteTypeORMModel>
    ){}

    async findMany(query: QueryContract): Promise<ResultContract<ProductoVariante[]>> {
        const options = QueryFindOptionsMapper.toFindOptions(query, PRODUCTO_VARIANTE_MAP);
        const productosVariantes = await this.productoVarianteTypeOrmRepo.find(options);
        const result: ResultContract<ProductoVariante[]> = {
            data: productosVariantes.map(pvOrm => ProductoVarianteTypeORMMapper.toDomain(pvOrm))
        }
        return result;
    }
}