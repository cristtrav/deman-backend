import { ColorRepository } from "@feature/color/domain/repository/color.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorTypeORMModel } from "../model/color.typeorm.model";
import { ILike, Repository } from "typeorm";
import { Color } from "@feature/color/domain/model/color.entity";
import { NewColor } from "@feature/color/domain/model/new-color.entity";
import { ColorMapper } from "../../mapper/color.mapper";
import { ColorNotFoundException } from "@feature/color/application/exception/color-not-found.exception";

@Injectable()
export class ColorTypeORMRepository implements ColorRepository {
    constructor(
        @InjectRepository(ColorTypeORMModel)
        private readonly colorRepository: Repository<ColorTypeORMModel>
    ) { }

    async create(color: NewColor): Promise<Color> {
        const colorORM = await this.colorRepository.save(ColorMapper.toTypeORMModel(color))
        return ColorMapper.toDomain(colorORM)
    }

    async getById(id: number): Promise<Color | null> {
        const colorEntity = await this.colorRepository.findOne({ where: { id, eliminado: false } })
        return colorEntity ? ColorMapper.toDomain(colorEntity) : null
    }

    async findByName(nombre: string): Promise<Color | null> {
        const normalizedDescription = nombre.trim().toLowerCase();
        const colorEntity = await this.colorRepository.findOne({
            where: { descripcion: ILike(`%${normalizedDescription}%`), eliminado: false },
        });
        return colorEntity ? ColorMapper.toDomain(colorEntity) : null;
    }

    async update(id: number, descripcion: string): Promise<Color> {
        await this.colorRepository.update(id, { descripcion });
        const updatedColor = await this.colorRepository.findOneBy({ id });
        if (!updatedColor) { throw new ColorNotFoundException(descripcion) }
        return ColorMapper.toDomain(updatedColor);
    }

    async delete(id: number): Promise<void> {
        const color = await this.colorRepository.findOne({ where: { id } });
        if (!color) { throw new NotFoundException() }
        color.eliminado = true;
        await this.colorRepository.save(color)
    }

    count(): Promise<number> {
        return this.colorRepository.count();
    }
}