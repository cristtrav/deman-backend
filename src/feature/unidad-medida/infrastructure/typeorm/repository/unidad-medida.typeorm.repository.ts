import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";
import { UnidadMedidaRepository } from "@feature/unidad-medida/domain/repository/unidad-medida.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UnidadMedidaTypeORMModel } from "../model/unidad-medida.typeorm.model";
import { Repository } from "typeorm";
import { UnidadMedidaTypeORMMapper } from "../mapper/unidad-medida.typeorm.mapper";

export class UnidadMedidaTypeORMRepository implements UnidadMedidaRepository {

    constructor(
        @InjectRepository(UnidadMedidaTypeORMModel)
        private unidadMedidaTypeOrmRepo: Repository<UnidadMedidaTypeORMModel>
    ){}

    async findById(id: string): Promise<UnidadMedida | null> {
        const unidadMedidaOrm = await this.unidadMedidaTypeOrmRepo.findOneBy({ id });
        if(unidadMedidaOrm == null) return null;
        return UnidadMedidaTypeORMMapper.toDomain(unidadMedidaOrm);
    }

}