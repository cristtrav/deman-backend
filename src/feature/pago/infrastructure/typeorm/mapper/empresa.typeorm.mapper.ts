import { Empresa } from "@feature/pago/domain/model/empresa";
import { EmpresaTypeORMModel } from "../model/empresa.typeorm.model";

export class EmpresaTypeORMMapper {
    static toDomain(empresaOrm: EmpresaTypeORMModel): Empresa {
        return new Empresa(empresaOrm.nombre, empresaOrm.direccion, empresaOrm.ruc, empresaOrm.telefono);
    }
}
