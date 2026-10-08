import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { ConsultarEmpresaUseCase } from "@feature/empresa/application/usecase/consultar-empresa.usecase";
import { GuardarEmpresaUseCase } from "@feature/empresa/application/usecase/guardar-empresa.usecase";
import { EmpresaRepository } from "@feature/empresa/domain/repository/empresa.repository";
import { ReciboEmpresaRepository } from "@feature/empresa/domain/repository/recibo-empresa.repository";
import { Provider } from "@nestjs/common";

export default <Provider[]>[
    {
        provide: ConsultarEmpresaUseCase,
        useFactory: (empresaRepository: EmpresaRepository) => new ConsultarEmpresaUseCase(empresaRepository),
        inject: [EmpresaRepository]
    },
    {
        provide: GuardarEmpresaUseCase,
        useFactory: (
            transactionManager: TransactionManager,
            empresaRepository: EmpresaRepository,
            reciboEmpresaRepository: ReciboEmpresaRepository
        ) => new GuardarEmpresaUseCase(transactionManager, empresaRepository, reciboEmpresaRepository),
        inject: [TransactionManager, EmpresaRepository, ReciboEmpresaRepository]
    }
]
