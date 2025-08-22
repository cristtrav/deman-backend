import { Categoria } from "@feature/inventario/categoria/domain/model/categoria.entity";
import { CategoriaTypeORMModel } from "../model/categoria.typeorm.model";
import { NewCategoria } from "@feature/inventario/categoria/domain/model/new-categoria.entity";

export class CategoriaTypeORMMapper {
    static toDomain(categoriaTypeOrmModel: CategoriaTypeORMModel): Categoria {
        return new Categoria(
            categoriaTypeOrmModel.id,
            categoriaTypeOrmModel.descripcion
        );
    }

    static toORMModel(categoria: Categoria | NewCategoria): CategoriaTypeORMModel{
        if(categoria instanceof NewCategoria) return this.newToORMModel(categoria);
        return this.existingToORMModel(categoria);
    }

    private static newToORMModel(newCategoria: NewCategoria): CategoriaTypeORMModel{
        const categoriaOrmModel = new CategoriaTypeORMModel();
        if(newCategoria.id != null) categoriaOrmModel.id = newCategoria.id;
        categoriaOrmModel.descripcion = newCategoria.descripcion;
        categoriaOrmModel.eliminado = false;
        return categoriaOrmModel;
    }

    private static existingToORMModel(categoria: Categoria): CategoriaTypeORMModel{
        const categoriaOrmModel = new CategoriaTypeORMModel();
        categoriaOrmModel.id = categoria.id;
        categoriaOrmModel.descripcion = categoria.descripcion;
        categoriaOrmModel.eliminado = false;
        return categoriaOrmModel;
    }
}