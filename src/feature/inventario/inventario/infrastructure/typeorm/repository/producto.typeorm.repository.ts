import { Producto } from "@feature/inventario/inventario/domain/model/producto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { Repository } from "typeorm";
import { ProductoTypeORMMapper } from "../mapper/producto.typeorm.mapper";
import { ProductoRepository } from "@feature/inventario/inventario/domain/repository/producto.repository";

export class ProductoTypeORMRepository implements ProductoRepository {

    constructor(
        @InjectRepository(ProductoTypeORMModel)
        private productoTypeOrmRepo: Repository<ProductoTypeORMModel>
    ){}

    async findById(id: number): Promise<Producto | null> {
        const productoOrm = await this.productoTypeOrmRepo.findOneBy({ id });
        if(productoOrm == null) return null;
        return ProductoTypeORMMapper.toDomain(productoOrm);
    }

}