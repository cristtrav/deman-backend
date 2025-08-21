import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";
import { NewCategoria } from "@feature/inventario/categoria/domain/model/new-categoria.entity";
import { CategoriaRepository } from "@feature/inventario/categoria/domain/repository/categoria.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { Repository } from "typeorm";
import { CategoriaTypeORMMapper } from "../mapper/categoria.typeorm.mapper";

export class CategoriaTypeORMRepository implements CategoriaRepository{
    
    constructor(
        @InjectRepository(CategoriaTypeORMModel)
        private categoriaTypeOrmRepo: Repository<CategoriaTypeORMModel> 
    ){}

    async findById(id: number): Promise<Categoria | null> {
        const categoriaOrm = await this.categoriaTypeOrmRepo.findOneBy({id});
        if(categoriaOrm == null) return null
        return CategoriaTypeORMMapper.toDomain(categoriaOrm);
    }

    async edit(categoria: Categoria): Promise<Categoria> {
        const savedCategriaOrmModel = await this.categoriaTypeOrmRepo.save(categoria);
        return CategoriaTypeORMMapper.toDomain(savedCategriaOrmModel);
    }

    async delete(id: number): Promise<void> {
        const categoria = await this.categoriaTypeOrmRepo.findOneByOrFail({ id });
        categoria.eliminado = true;
        await this.categoriaTypeOrmRepo.save(categoria); 
    }

    async create(newCategoria: NewCategoria): Promise<Categoria> {
        const newCategoriaOrmModel = CategoriaTypeORMMapper.toORMModel(newCategoria);
        const savedCategriaOrmModel = await this.categoriaTypeOrmRepo.save(newCategoriaOrmModel);
        return CategoriaTypeORMMapper.toDomain(savedCategriaOrmModel);
    }

}