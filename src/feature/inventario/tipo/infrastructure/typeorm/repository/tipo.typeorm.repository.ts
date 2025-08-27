import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";
import { Repository } from "typeorm";
import { TipoRepository } from "@feature/inventario/tipo/domain/repository/tipo.repository";
import { NewTipo } from "@feature/inventario/tipo/domain/model/new-tipo.entity";
import { Tipo } from "@feature/inventario/tipo/domain/model/tipo.entity";
import { TipoTypeORMMapper } from "../mapper/tipo.typeorm.mapper";

@Injectable()
export class TipoTypeORMRepository implements TipoRepository {
    constructor(
        @InjectRepository(TipoTypeORMModel)
        private readonly tipoRepository: Repository<TipoTypeORMModel>
    ) { }

    async create(newTipo: NewTipo): Promise<Tipo> {
        const newTipoORMModel = TipoTypeORMMapper.toORMModel(newTipo)
        const savedTipoORMModel = await this.tipoRepository.save(newTipoORMModel)
        return TipoTypeORMMapper.toDomain(savedTipoORMModel)
    }

    async findById(id: number): Promise<Tipo | null> {
        const tipoORM = await this.tipoRepository.findOne({ where: { id, eliminado: false } })
        if (tipoORM == null) return null
        return tipoORM ? TipoTypeORMMapper.toDomain(tipoORM) : null
    }

    async edit(tipo: Tipo): Promise<Tipo> {
        const tipoORM = TipoTypeORMMapper.toORMModel(tipo);
        const saved = await this.tipoRepository.save(tipoORM);
        return TipoTypeORMMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        const tipo = await this.tipoRepository.findOneByOrFail({ id });
        tipo.eliminado = true;
        await this.tipoRepository.save(tipo)
    }

}