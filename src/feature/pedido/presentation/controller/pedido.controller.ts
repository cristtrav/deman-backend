import { CrearPedidoUseCase } from "@feature/pedido/application/usecase/crear-pedido.usecase";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { NewPedidoDTO } from "../dto/new-pedido.dto";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { PedidoDTO } from "../dto/pedido.dto";
import { PedidoDTOMapper } from "../mapper/pedido-dto.mapper";
import { ConsultarPedidoPorIdUseCase } from "@feature/pedido/application/usecase/consultar-pedido-por-id.usecase";
import { ConsultarPedidosUseCase } from "@feature/pedido/application/usecase/consultar-pedidos-usecase";
import { GetPedidosQueryParamDTO } from "../dto/http/get-pedidos-query-param.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";

@Controller('pedidos')
export class PedidoController {
    constructor(
        private readonly crearPedidoUseCase: CrearPedidoUseCase,
        private readonly consultarPedidoPorIdUseCase: ConsultarPedidoPorIdUseCase,
        private readonly consultarPedidosUseCase: ConsultarPedidosUseCase
    ) {}

    @Get(':id')
    async consultarPedidoPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<PedidoDTO>> {
        const result = await this.consultarPedidoPorIdUseCase.execute(id);
        return ApiResponseDTO.success({
            data: PedidoDTOMapper.toDTO(result.data),
            message: "Pedido consultado exitosamente"
        });
    }

    @Post()
    async crearPedido(@Body() newPedidoDto: NewPedidoDTO): Promise<ApiResponseDTO<PedidoDTO>> {
        const result = await this.crearPedidoUseCase.execute({
            data: {
                clienteId: newPedidoDto.clienteId,
                fechaPedido: newPedidoDto.fechaPedido,
                fechaConfirmacion: newPedidoDto.fechaPedido, //Se asume que la fecha de confimacion es la misma que el pedido
                fechaEntrega: newPedidoDto.fechaEntrega,
                confirmado: true, //Se asume que el pedido se confirma al momento de crearlo
                entregado: false, //Se asume que el pedido aún no se ha entregado
                descripcion: newPedidoDto.descripcion,
                total: newPedidoDto.total
            }
        });
        return ApiResponseDTO.success({
            data: PedidoDTOMapper.toDTO(result.data),
            message: "Pedido creado exitosamente"
        });
    }

    @Get()
    async consultarPedidos(
        @Query() query: GetPedidosQueryParamDTO
    ): Promise<ApiResponseDTO<PedidoDTO[]>> {
        const result = await this.consultarPedidosUseCase.execute(GetQueryParamsMapper.toQueryContract(query));
        return ApiResponseDTO.success({
            data: result.data.map(p => PedidoDTOMapper.toDTO(p)),
            message: "Pedidos consultados exitosamente",
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        });
    }
}