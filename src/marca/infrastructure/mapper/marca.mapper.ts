import { Marca } from "src/marca/domain/model/marca.entity";
import { NewMarca } from "src/marca/domain/model/new-marca.entity";
import { MarcaTypeORMModel } from "../typeorm/model/marca.typeorm.model";

export class MarcaMapper {
    static toDomain(marcaTypeORM: MarcaTypeORMModel): Marca {
        return new Marca(
            marcaTypeORM.id,
            marcaTypeORM.descripcion,
            marcaTypeORM.eliminado
        );
    }

    static toTypeORMModel(marca: NewMarca): MarcaTypeORMModel {
        const marcaTypeORM = new MarcaTypeORMModel();
        marcaTypeORM.descripcion = marca.getDescripcion();
        marcaTypeORM.eliminado = marca.isEliminado();
        return marcaTypeORM;
    }
}
