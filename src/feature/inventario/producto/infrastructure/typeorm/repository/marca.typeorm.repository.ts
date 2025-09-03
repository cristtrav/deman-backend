import { Marca } from "@feature/inventario/producto/domain/model/marca";
import { MarcaRepository } from "@feature/inventario/producto/domain/repository/marca.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";
import { Repository } from "typeorm";
import { MarcaTypeORMMapper } from "../mapper/marca-typeorm.mapper";

export class MarcaTypeORMRepository implements MarcaRepository{

    constructor(
        @InjectRepository(MarcaTypeORMModel)
        private marcaTypeOrmRepo: Repository<MarcaTypeORMModel>
    ){}

    async findById(id: number): Promise<Marca | undefined> {
        const marcaTypeOrm = await this.marcaTypeOrmRepo.findOneBy({ id });
        if(marcaTypeOrm == null) return undefined;
        return MarcaTypeORMMapper.toDomain(marcaTypeOrm);
    }

}