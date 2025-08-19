import { Marca } from "../../domain/model/marca.entity";
import { NewMarca } from "../../domain/model/new-marca.entity";
import { MarcaTypeORMModel } from "../typeorm/model/marca.typeorm.model";

export class MarcaMapper {
    static toDomain(marcaTypeORM: MarcaTypeORMModel): Marca {
        return new Marca(
            marcaTypeORM.id,
            marcaTypeORM.descripcion
        );
    }

    static toTypeORMModel(marca: NewMarca): MarcaTypeORMModel {
        const marcaTypeORM = new MarcaTypeORMModel();
        marcaTypeORM.descripcion = marca.descripcion;
        marcaTypeORM.eliminado = true;
        return marcaTypeORM;
    }
}
