import { ColorRepository } from "@feature/inventario/color/domain/repository/color.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorTypeORMModel } from "../model/color.typeorm.model";
import { Repository } from "typeorm";
import { Color } from "@feature/inventario/color/domain/model/color.entity";
import { NewColor } from "@feature/inventario/color/domain/model/new-color.entity";
import { ColorTypeORMMapper } from "../mapper/color.typeorm.mapper";
import { ColorMapper } from "../../mapper/color.mapper";

@Injectable()
export class ColorTypeORMRepository implements ColorRepository {
    constructor(
        @InjectRepository(ColorTypeORMModel)
        private readonly colorRepository: Repository<ColorTypeORMModel>
    ) { }

    async create(newColor: NewColor): Promise<Color> {
        const newColorORMModel = ColorTypeORMMapper.toORMModel(newColor)
        const savedColorORMModel = await this.colorRepository.save(newColorORMModel)
        return ColorTypeORMMapper.toDomain(savedColorORMModel)
    }

    async findById(id: number): Promise<Color | null> {
        const colorORM = await this.colorRepository.findOne({where: { id, eliminado: false }})
        if (colorORM == null) return null
         return colorORM ? ColorMapper.toDomain(colorORM) : null
    }

    async edit(color: Color): Promise<Color> {
        const colorORM = ColorTypeORMMapper.toORMModel(color);
        const saved = await this.colorRepository.save(colorORM);
        return ColorTypeORMMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        const color = await this.colorRepository.findOneByOrFail({ id });
        color.eliminado = true;
        await this.colorRepository.save(color)
    }

}