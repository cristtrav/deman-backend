import { NewProducto } from "@feature/inventario/producto/domain/model/new-producto";
import { Producto } from "@feature/inventario/producto/domain/model/producto";
import { ProductoRepository } from "@feature/inventario/producto/domain/repository/producto.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoTypeORMModel } from "../model/producto.typeorm.model";
import { Repository } from "typeorm";
import { NewProductoTypeORMMapper } from "../mapper/new-producto.typeorm.mapper";
import { ProductoTypeORMMapper } from "../mapper/producto.typeorm.mapper";

export class ProductoTypeORMRepository implements ProductoRepository {

    constructor(
        @InjectRepository(ProductoTypeORMModel)
        private productoTypeOrmRepository: Repository<ProductoTypeORMModel>
    ){}

    async create(newProducto: NewProducto): Promise<Producto> {
        const productoTypeOrm = NewProductoTypeORMMapper.toORM(newProducto);
        const savedProductoTypeOrm = await this.productoTypeOrmRepository.save(productoTypeOrm);
        return ProductoTypeORMMapper.toDomain(await this.productoTypeOrmRepository.findOneByOrFail({id: savedProductoTypeOrm.id}));
    }
    
    async edit(previousId: number, producto: Producto): Promise<Producto> {
        const productoTypeOrm = ProductoTypeORMMapper.toORM(producto);
        const savedProductoTypeOrm = await this.productoTypeOrmRepository.save(productoTypeOrm);
        if(previousId != productoTypeOrm.id) await this.productoTypeOrmRepository.delete(previousId);
        return ProductoTypeORMMapper.toDomain(await this.productoTypeOrmRepository.findOneByOrFail({id: savedProductoTypeOrm.id}));
    }

    async delete(id: number): Promise<void> {
        const productoTypeOrm = await this.productoTypeOrmRepository.findOneByOrFail({id});
        productoTypeOrm.eliminado = true;
        await this.productoTypeOrmRepository.save(productoTypeOrm);
    }
    
    async findById(id: number): Promise<Producto | undefined> {
        const productoTypeOrm = await this.productoTypeOrmRepository.findOneBy({id});
        if(productoTypeOrm == null) return undefined;
        return ProductoTypeORMMapper.toDomain(productoTypeOrm);
    }

}