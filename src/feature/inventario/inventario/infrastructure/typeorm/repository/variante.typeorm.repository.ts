import { Variante } from "@feature/inventario/inventario/domain/model/variante";
import { VarianteRepository } from "@feature/inventario/inventario/domain/repository/variante.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { VarianteTypeORMModel } from "../model/variante.typeorm.model";
import { Repository } from "typeorm";
import { VarianteTypeORMMapper } from "../mapper/variante.typeorm.mapper";

export class VarianteTypeORMRepository implements VarianteRepository {

    constructor(
        @InjectRepository(VarianteTypeORMModel)
        private varianteTypeOrmRepo: Repository<VarianteTypeORMModel>
    ){}

    async findById(id: number): Promise<Variante | null> {
        const varianteOrm = await this.varianteTypeOrmRepo.findOneBy({ id });
        if(varianteOrm == null) return null;
        return VarianteTypeORMMapper.toDomain(varianteOrm);
    }

}