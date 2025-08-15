import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { ILike, Repository } from "typeorm";
import { MarcaNotFoundException } from "@feature/marca/application/exception/marca-not-found.exception";
import { Marca } from "@feature/marca/domain/model/marca.entity";
import { NewMarca } from "@feature/marca/domain/model/new-marca.entity";
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository";
import { MarcaMapper } from "../../mapper/marca.mapper";

@Injectable()
export class MarcaTypeORMRepository implements MarcaRepository {
    constructor(
        @InjectRepository(MarcaTypeORMModel)
        private readonly marcaRepository: Repository<MarcaTypeORMModel>
    ) { }
    async crear(marca: NewMarca): Promise<Marca> {
        const marcaORM = await this.marcaRepository.save(MarcaMapper.toTypeORMModel(marca))
        return MarcaMapper.toDomain(marcaORM)
    }

    async listar(): Promise<Marca[]> {
        console.log("type Repository")
        console.log(this.marcaRepository.find({ where: { eliminado: false } }))
        const listaMarcas = await this.marcaRepository.find({ where: { eliminado: false } })
        console.log("lista de marcas", listaMarcas)
        return listaMarcas.map(marcaORM => MarcaMapper.toDomain(marcaORM))
    }

    async obtenerPorId(id: number): Promise<Marca | null> {
        const marcaEntity = await this.marcaRepository.findOne({ where: { id, eliminado: false } })
        return marcaEntity ? MarcaMapper.toDomain(marcaEntity) : null
    }

    async actualizar(id: number, descripcion: string): Promise<Marca> {
        await this.marcaRepository.update(id, { descripcion });
        const marcaActualizada = await this.marcaRepository.findOneBy({ id });
        if (!marcaActualizada) {
            throw new MarcaNotFoundException(descripcion);
        }
        return MarcaMapper.toDomain(marcaActualizada);
    }

    async eliminar(id: number): Promise<void> {
        const marca = await this.marcaRepository.findOne({ where: { id } });
        if (!marca) {
            throw new MarcaNotFoundException("");
        }
        marca.eliminado = true;
        await this.marcaRepository.save(marca);
    }

    contar(): Promise<number> {
        return this.marcaRepository.count();
    }

    async buscarPorNombre(nombre: string): Promise<Marca | null> {
    const nombreNormalizado = nombre.trim().toLowerCase();

    const marcaEntity = await this.marcaRepository.findOne({
        where: { descripcion: ILike(`%${nombreNormalizado}%`), eliminado: false },
    });

    return marcaEntity ? MarcaMapper.toDomain(marcaEntity) : null;
}
}