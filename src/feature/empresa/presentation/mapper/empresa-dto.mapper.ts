import { EmpresaData } from "@feature/empresa/application/contract/data/empresa.data";
import { EmpresaDTO } from "../dto/empresa.dto";

export class EmpresaDTOMapper {
    static toDTO(empresa: EmpresaData): EmpresaDTO {
        const empresaDTO = new EmpresaDTO();
        empresaDTO.nombre = empresa.nombre;
        empresaDTO.direccion = empresa.direccion;
        empresaDTO.ruc = empresa.ruc;
        empresaDTO.telefono = empresa.telefono;
        return empresaDTO;
    }

    static toData(dto: EmpresaDTO): EmpresaData {
        return {
            nombre: dto.nombre,
            direccion: dto.direccion,
            ruc: dto.ruc,
            telefono: dto.telefono
        };
    }
}
