import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { ProductoReadRepository } from "@feature/inventario/producto/application/read/repository/producto.read-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductoTypeORMMapper } from "../mapper/producto.typeorm.mapper";
import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { Producto } from "@feature/inventario/producto/domain/model/producto";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import PRODUCTO_FIELD_MAP from "../mapping/producto.typeorm.mapping";

export class ProductoReadTypeORMRepository implements ProductoReadRepository {

    constructor(
        @InjectRepository(ProductoTypeORMModel)
        private productoReadTypeOrmRepository: Repository<ProductoTypeORMModel>
    ){}

    async findById(id: number): Promise<Producto | undefined> {
        const productoReadTypeOrm = await this.productoReadTypeOrmRepository.findOneBy({id});
        if(productoReadTypeOrm == null) return undefined;
        return ProductoTypeORMMapper.toDomain(productoReadTypeOrm);
    }

    async findMany(query: QueryContract): Promise<ResultContract<Producto[]>> {
        const options = QueryFindOptionsMapper.toFindOptions(query, PRODUCTO_FIELD_MAP);
        options.where = { ...options.where, eliminado: false }
        const productosRead = await this.productoReadTypeOrmRepository.find(options);
        const result: ResultContract<Producto[]> = { data:  productosRead.map(p => ProductoTypeORMMapper.toDomain(p)) }
        if(query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.productoReadTypeOrmRepository.count(options)
        }
        return result;
    }

}