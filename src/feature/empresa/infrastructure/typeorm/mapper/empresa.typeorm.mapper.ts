import { Empresa } from "@feature/empresa/domain/model/empresa";
import { EmpresaTypeORMModel } from "../model/empresa.typeorm.model";

export class EmpresaTypeORMMapper {
    static toDomain(empresaOrm: EmpresaTypeORMModel): Empresa {
        return new Empresa(empresaOrm.nombre, empresaOrm.direccion, empresaOrm.ruc, empresaOrm.telefono);
    }

    static toORM(empresa: Empresa): EmpresaTypeORMModel {
        const empresaOrm = new EmpresaTypeORMModel();
        empresaOrm.id = EmpresaTypeORMModel.ID;
        empresaOrm.nombre = empresa.nombre;
        empresaOrm.direccion = empresa.direccion ?? null;
        empresaOrm.ruc = empresa.ruc ?? null;
        empresaOrm.telefono = empresa.telefono ?? null;
        return empresaOrm;
    }
}
