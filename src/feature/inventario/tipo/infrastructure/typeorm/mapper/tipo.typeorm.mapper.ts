import { NewTipo } from "../../../domain/model/new-tipo.entity";
import { Tipo } from "../../../domain/model/tipo.entity";
import { TipoTypeORMModel } from "../model/tipo.typeorm.model";

export class TipoTypeORMMapper {
    static toDomain(tipoTypeORM: TipoTypeORMModel): Tipo {
        return new Tipo(
            tipoTypeORM.id,
            tipoTypeORM.descripcion,
        );
    }

    static toORMModel(tipo: Tipo | NewTipo): TipoTypeORMModel {
        if (tipo instanceof NewTipo) return this.newToORMModel(tipo);
        return this.existingToORMModel(tipo);
    }
    private static newToORMModel(newTipo: NewTipo): TipoTypeORMModel {
        const tipoOrmModel = new TipoTypeORMModel();
        if(newTipo.id != null) tipoOrmModel.id = newTipo.id;
        tipoOrmModel.descripcion = newTipo.descripcion;
        tipoOrmModel.eliminado = false;
        return tipoOrmModel;
    }
    
        private static existingToORMModel(tipo: Tipo): TipoTypeORMModel{
            const tipoOrmModel = new TipoTypeORMModel();
            tipoOrmModel.id = tipo.id
            tipoOrmModel.descripcion = tipo.descripcion
            tipoOrmModel.eliminado = false;
            return tipoOrmModel
        }
}