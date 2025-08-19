import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { ILike, Repository } from "typeorm";
import { MarcaMapper } from "../../mapper/marca.mapper";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { MarcaRepository } from "@feature/inventario/marca/domain/repository/marca.repository";
import { Marca } from "@feature/inventario/marca/domain/model/marca.entity";
import { NewMarca } from "@feature/inventario/marca/domain/model/new-marca.entity";

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
            throw new NotFoundException("Marca", id);
        }
        return MarcaMapper.toDomain(marcaActualizada);
    }

    async eliminar(id: number): Promise<void> {
        const marca = await this.marcaRepository.findOne({ where: { id } });
        if (!marca) {
            throw new NotFoundException("Marca", id);
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