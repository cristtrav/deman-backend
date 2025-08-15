import { Tipo } from "@feature/tipo/domain/model/tipo.entity";
import { TipoTypeORMModel } from "../typeorm/model/tipo.typeorm.model";
import { NewTipo } from "@feature/tipo/domain/model/new-tipo.entity";

export class TipoMapper {
    static toDomain(tipoTypeORM: TipoTypeORMModel): Tipo {
        return new Tipo(
            tipoTypeORM.id,
            tipoTypeORM.descripcion,
            tipoTypeORM.eliminado
        );
    }

    static toTypeORMModel(tipo: NewTipo): TipoTypeORMModel {
        const tipoTypeORM = new TipoTypeORMModel();
        tipoTypeORM.descripcion = tipo.getDescripcion();
        tipoTypeORM.eliminado = tipo.isEliminado();
        return tipoTypeORM;
    }
}