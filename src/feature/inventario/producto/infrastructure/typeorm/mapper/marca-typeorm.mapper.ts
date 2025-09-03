import { Marca } from "@feature/inventario/producto/domain/model/marca";
import { MarcaTypeORMModel } from "../model/marca.typeorm.model";

export class MarcaTypeORMMapper{
    static toDomain(marcaTypeorm: MarcaTypeORMModel): Marca {
        return new Marca(marcaTypeorm.id, marcaTypeorm.descripcion);
    }    
}