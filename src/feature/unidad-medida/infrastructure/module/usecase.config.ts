import { UnidadMedidaReadRepository } from "@feature/unidad-medida/application/repository/unidad-medida.read-repository";
import { ConsultarUnidadesMedidasUseCase } from "@feature/unidad-medida/application/usecase/consultar-unidades-medidas.usecase";
import { Provider } from "@nestjs/common";

export default <Provider[]> [
    {
        provide: ConsultarUnidadesMedidasUseCase,
        useFactory: (unidadMedidaReadRepo: UnidadMedidaReadRepository) => new ConsultarUnidadesMedidasUseCase(unidadMedidaReadRepo),
        inject: [ UnidadMedidaReadRepository ]
    }
]