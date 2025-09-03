import { Tipo } from "@feature/inventario/producto/domain/model/tipo";
import { TipoRepository } from "@feature/inventario/producto/domain/repository/tipo.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";
import { Repository } from "typeorm";
import { TipoTypeORMMapper } from "../mapper/tipo-typeorm.mapper";

export class TipoTypeORMRepository implements TipoRepository {

    constructor(
        @InjectRepository(TipoTypeORMModel)
        private tipoTypeOrmRepository: Repository<TipoTypeORMModel>
    ){}

    async findById(id: number): Promise<Tipo | undefined> {
        const tipoTypeOrm = await this.tipoTypeOrmRepository.findOneBy({ id });
        if(tipoTypeOrm == null) return undefined;
        return TipoTypeORMMapper.toDomain(tipoTypeOrm);
    }

}