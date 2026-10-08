import { Empresa } from "@feature/empresa/domain/model/empresa";
import { EmpresaData } from "../contract/data/empresa.data";

export class EmpresaDataMapper {
    static toData(empresa: Empresa): EmpresaData {
        return {
            nombre: empresa.nombre,
            direccion: empresa.direccion,
            ruc: empresa.ruc,
            telefono: empresa.telefono
        };
    }

    static toDomain(data: EmpresaData): Empresa {
        return new Empresa(data.nombre, data.direccion, data.ruc, data.telefono);
    }
}
