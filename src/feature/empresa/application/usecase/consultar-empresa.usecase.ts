import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { EmpresaRepository } from "@feature/empresa/domain/repository/empresa.repository";
import { ConsultarEmpresaResult } from "../contract/result/consultar-empresa.result";
import { EmpresaDataMapper } from "../mapper/empresa-data.mapper";

export class ConsultarEmpresaUseCase extends BaseUseCase<void, ConsultarEmpresaResult> {

    constructor(
        private readonly empresaRepository: EmpresaRepository
    ) { super(); }

    async execute(): Promise<ConsultarEmpresaResult> {
        const empresa = await this.empresaRepository.obtener();
        return { data: empresa ? EmpresaDataMapper.toData(empresa) : null };
    }
}
