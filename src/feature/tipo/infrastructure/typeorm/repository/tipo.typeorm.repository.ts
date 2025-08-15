import { TipoRepository } from "@feature/tipo/domain/repository/tipo.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";
import { ILike, Repository } from "typeorm";
import { NewTipo } from "@feature/tipo/domain/model/new-tipo.entity";
import { Tipo } from "@feature/tipo/domain/model/tipo.entity";
import { TipoMapper } from "../../mapper/tipo.mapper";
import { TipoNotFoundException } from "@feature/tipo/application/exception/tipo-not-found.exception";
import { NotFoundException } from "@core/application/exception/not-found.exception";

@Injectable()
export class TipoTypeORMRepository implements TipoRepository {
    constructor(
        @InjectRepository(TipoTypeORMModel)
        private readonly tipoRepository: Repository<TipoTypeORMModel>
    ) { }

    async create(tipo: NewTipo): Promise<Tipo> {
        const tipoORM = await this.tipoRepository.save(TipoMapper.toTypeORMModel(tipo))
        return TipoMapper.toDomain(tipoORM)
    }

    async getById(id: number): Promise<Tipo | null> {
        const tipoEntity = await this.tipoRepository.findOne({ where: { id, eliminado: false } })
        return tipoEntity ? TipoMapper.toDomain(tipoEntity) : null
    }

    async findByName(nombre: string): Promise<Tipo | null> {
        const normalizedDescription = nombre.trim().toLowerCase();
        const tipoEntity = await this.tipoRepository.findOne({
            where: { descripcion: ILike(`%${normalizedDescription}%`), eliminado: false },
        });
        return tipoEntity ? TipoMapper.toDomain(tipoEntity) : null;
    }

    async update(id: number, descripcion: string): Promise<Tipo> {
        await this.tipoRepository.update(id, { descripcion });
        const updatedTipo = await this.tipoRepository.findOneBy({ id });
        if (!updatedTipo) { throw new TipoNotFoundException(descripcion) }
        return TipoMapper.toDomain(updatedTipo);
    }

    async delete(id: number): Promise<void> {
        const tipo = await this.tipoRepository.findOne({ where: { id } });
        if (!tipo) { throw new NotFoundException("tipo", id) }
        tipo.eliminado = true;
        await this.tipoRepository.save(tipo)
    }

    count(): Promise<number> {
        return this.tipoRepository.count();
    }
}