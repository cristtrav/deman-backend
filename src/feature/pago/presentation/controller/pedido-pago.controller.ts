import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { ConsultarPagosPorPedidoUseCase } from "@feature/pago/application/usecase/consultar-pagos-por-pedido.usecase";
import { PagoDTO } from "../dto/pago.dto";
import { PagoDTOMapper } from "../mapper/pago-dto.mapper";

@Controller('pedidos/:idPedido/pagos')
export class PedidoPagoController {
    constructor(
        private readonly consultarPagosPorPedidoUseCase: ConsultarPagosPorPedidoUseCase
    ) {}

    @Get()
    async consultarPagosPorPedido(
        @Param('idPedido', ParseIntPipe) idPedido: number
    ): Promise<ApiResponseDTO<PagoDTO[]>> {
        const result = await this.consultarPagosPorPedidoUseCase.execute(idPedido);
        return ApiResponseDTO.success({
            data: result.data.map(p => PagoDTOMapper.toDTO(p)),
            message: "Pagos del pedido consultados exitosamente"
        });
    }
}
