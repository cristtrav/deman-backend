import { UnidadMedida } from "@feature/inventario/inventario/domain/model/unidad-medida";
import { UnidadMedidaTypeORMModel } from "../model/unidad-medida.typeorm.model";

export class UnidadMedidaTypeORMMapper {
    static toDomain(unidadMedidaTypeOrm: UnidadMedidaTypeORMModel): UnidadMedida{        
        return new UnidadMedida(
            unidadMedidaTypeOrm.id,
            unidadMedidaTypeOrm.descripcionSingular,
            unidadMedidaTypeOrm.descripcionPlural,
            unidadMedidaTypeOrm.abreviaturaSingular,
            unidadMedidaTypeOrm.abreviaturaPlural
        );
    }
}