import { Inventario } from "@feature/inventario/inventario/domain/model/inventario";
import { NewInventario } from "@feature/inventario/inventario/domain/model/new-inventario";
import { InventarioRepository } from "@feature/inventario/inventario/domain/repository/inventario.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { InventarioTypeORMModel } from "../model/inventario.typeorm.model";
import { Repository } from "typeorm";
import { NewInventarioTypeORMMapper } from "../mapper/new-inventario.typeorm.mapper";
import { InventarioTypeORMMapper } from "../mapper/inventario.typeorm.mapper";
import { EditInventario } from "@feature/inventario/inventario/domain/model/edit-inventario";
import { EditInventarioTypeORMMapper } from "../mapper/edit-inventario.typeorm.mapper";

export class InventarioTypeORMRepository implements InventarioRepository {

    constructor(
        @InjectRepository(InventarioTypeORMModel)
        private inventarioTypeOrmRepo: Repository<InventarioTypeORMModel>
    ){ }

    async create(inventario: NewInventario): Promise<Inventario> {
       const savedInventario = await this.inventarioTypeOrmRepo.save(NewInventarioTypeORMMapper.toORM(inventario))
       return InventarioTypeORMMapper.toDomain(await this.inventarioTypeOrmRepo.findOneByOrFail({id: savedInventario.id}));
    }

    async edit(inventario: EditInventario): Promise<Inventario> {
        const savedInventario = await this.inventarioTypeOrmRepo.save(EditInventarioTypeORMMapper.toORM(inventario));
        return InventarioTypeORMMapper.toDomain(
            await this.inventarioTypeOrmRepo.findOneByOrFail({id: savedInventario.id })
        );
    }

    async delete(id: number): Promise<void> {
        const inventario = await this.inventarioTypeOrmRepo.findOneByOrFail({id});
        inventario.eliminado = true;
        await this.inventarioTypeOrmRepo.save(inventario);
    }

    async findById(id: number): Promise<Inventario | null> {
        const inventarioOrm = await this.inventarioTypeOrmRepo.findOneBy({ id });
        if(!inventarioOrm) return null;
        return InventarioTypeORMMapper.toDomain(inventarioOrm);
    }

}