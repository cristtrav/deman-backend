import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { EmpresaRepository } from "@feature/empresa/domain/repository/empresa.repository";
import { ReciboEmpresaRepository } from "@feature/empresa/domain/repository/recibo-empresa.repository";
import { GuardarEmpresaCommand } from "../contract/command/guardar-empresa.command";
import { EmpresaData } from "../contract/data/empresa.data";
import { EmpresaDataMapper } from "../mapper/empresa-data.mapper";

/**
 * Registra o actualiza los datos de la empresa. Los recibos emitidos antes de que existiera
 * la empresa se completan con estos datos en la misma transacción; los que ya los tienen
 * conservan los del momento de su emisión.
 */
export class GuardarEmpresaUseCase extends BaseUseCase<GuardarEmpresaCommand, ResultContract<EmpresaData>> {

    constructor(
        private readonly transactionManager: TransactionManager,
        private readonly empresaRepository: EmpresaRepository,
        private readonly reciboEmpresaRepository: ReciboEmpresaRepository
    ) { super(); }

    async execute(command: GuardarEmpresaCommand): Promise<ResultContract<EmpresaData>> {
        const empresa = EmpresaDataMapper.toDomain(command.data);
        return this.transactionManager.run(async () => {
            const guardada = await this.empresaRepository.guardar(empresa);
            await this.reciboEmpresaRepository.completarRecibosSinEmpresa(guardada);
            return { data: EmpresaDataMapper.toData(guardada) };
        });
    }
}
