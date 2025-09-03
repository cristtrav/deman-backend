import { Categoria } from "@feature/inventario/producto/domain/model/categoria";
import { CategoriaRepository } from "@feature/inventario/producto/domain/repository/categoria.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { Repository } from "typeorm";
import { CategoriaTypeORMMapper } from "../mapper/categoria-typeorm.mapper";

export class CategoriaTypeORMRepository implements CategoriaRepository {

    constructor(
        @InjectRepository(CategoriaTypeORMModel)
        private categoriaTypeOrmRepository: Repository<CategoriaTypeORMModel>
    ){}

    async findById(id: number): Promise<Categoria | undefined> {
        const categoriaTypeOrm = await this.categoriaTypeOrmRepository.findOneBy({id});
        if(categoriaTypeOrm == null) return undefined;
        return CategoriaTypeORMMapper.toDomain(categoriaTypeOrm);
    }
    
}