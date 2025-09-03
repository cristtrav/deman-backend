import { UnidadMedida } from "@feature/inventario/producto/domain/model/unidad-medida";
import { UnidadMedidaRepository } from "@feature/inventario/producto/domain/repository/unidad-medida.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UnidadMedidaTypeORMModel } from "../model/unidad-medida.typeorm.model";
import { Repository } from "typeorm";
import { UnidadMedidaTypeORMMapper } from "../mapper/unidad-medida.typeorm.model";

export class UnidadMedidaTypeORMRepository implements UnidadMedidaRepository{

    constructor(
        @InjectRepository(UnidadMedidaTypeORMModel)
        private unidadMedidaTypeOrmRepository: Repository<UnidadMedidaTypeORMModel>
    ){}
    
    async findById(id: string): Promise<UnidadMedida | undefined> {
        const unidadMedidaTypeOrm = await this.unidadMedidaTypeOrmRepository.findOneBy({ id });
        if(unidadMedidaTypeOrm == null) return;
        return UnidadMedidaTypeORMMapper.toDomain(unidadMedidaTypeOrm);
    }

}