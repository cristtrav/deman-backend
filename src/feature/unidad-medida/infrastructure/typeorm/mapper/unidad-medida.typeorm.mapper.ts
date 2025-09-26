import { UnidadMedida } from "@feature/unidad-medida/domain/model/unidad-medida";
import { UnidadMedidaTypeORMModel } from "../model/unidad-medida.typeorm.model";
import { Conjugacion } from "@feature/unidad-medida/domain/model/conjugacion";

export class UnidadMedidaTypeORMMapper{
    static toDomain(unidadMedidaOrm: UnidadMedidaTypeORMModel): UnidadMedida {
        const descripcion = new Conjugacion(unidadMedidaOrm.descripcionSingular, unidadMedidaOrm.descripcionPlural);
        const abreviatura = new Conjugacion(unidadMedidaOrm.abreviaturaSingular, unidadMedidaOrm.abreviaturaPlural);
        const unidadMedida = new UnidadMedida(unidadMedidaOrm.id, descripcion, abreviatura);
        return unidadMedida;
    }
}