import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { Repository } from "typeorm";
import { MarcaMapper } from "../../mapper/marca.mapper";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { MarcaRepository } from "@feature/inventario/marca/domain/repository/marca.repository";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";
import { NewMarca } from "@feature/inventario/marca/domain/model/new-marca.entity";

@Injectable()
export class MarcaTypeORMRepository implements MarcaRepository {

    constructor(
        @InjectRepository(MarcaTypeORMModel)
        private readonly marcaTypeOrmRepository: Repository<MarcaTypeORMModel>
    ) { }
    
    async create(newMarca: NewMarca): Promise<Marca> {
        const marcaOrm = await this.marcaTypeOrmRepository.save(MarcaMapper.toTypeORMModel(newMarca))
        return MarcaMapper.toDomain(marcaOrm)
    }

    async findById(id: number): Promise<Marca | null> {
        const marcaEntity = await this.marcaTypeOrmRepository.findOne({ where: { id, eliminado: false } })
        return marcaEntity ? MarcaMapper.toDomain(marcaEntity) : null
    }

    async edit(marca: Marca): Promise<Marca> {
        if(!await this.marcaTypeOrmRepository.findOneBy({id: marca.id}))
            throw new NotFoundException("Marca", marca.id);
        const savedMarcaOrm = await this.marcaTypeOrmRepository.save(marca);
        return MarcaMapper.toDomain(savedMarcaOrm);
    }

    async delete(id: number): Promise<void> {
        const marca = await this.marcaTypeOrmRepository.findOne({ where: { id } });
        if (!marca) {
            throw new NotFoundException("Marca", id);
        }
        marca.eliminado = true;
        await this.marcaTypeOrmRepository.save(marca);
    }
}