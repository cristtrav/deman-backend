import { CrearPedidoUseCase } from "@feature/pedido/application/usecase/crear-pedido.usecase";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { NewPedidoDTO } from "../dto/new-pedido.dto";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { PedidoDTO } from "../dto/pedido.dto";
import { PedidoDTOMapper } from "../mapper/pedido-dto.mapper";
import { ConsultarPedidoPorIdUseCase } from "@feature/pedido/application/usecase/consultar-pedido-por-id.usecase";
import { ConsultarPedidosUseCase } from "@feature/pedido/application/usecase/consultar-pedidos-usecase";
import { GetPedidosQueryParamDTO } from "../dto/http/get-pedidos-query-param.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { EditarPedidoUseCase } from "@feature/pedido/application/usecase/editar-pedido.usecase";
import { EditPedidoDTO } from "../dto/edit-pedido.dto";
import { EliminarPedidoUseCase } from "@feature/pedido/application/usecase/eliminar-pedido.usecase";
import { ContarPedidosPendientesUseCase } from "@feature/pedido/application/usecase/contar-pedidos-pendientes.usecase";
import { ConsultarProximasEntregasUseCase } from "@feature/pedido/application/usecase/consultar-proximas-entregas.usecase";
import { GetProximasEntregasQueryParamDTO } from "../dto/http/get-proximas-entregas-query-param.dto";
import { PedidosPendientesDTO } from "../dto/pedidos-pendientes.dto";

@Controller('pedidos')
export class PedidoController {
    constructor(
        private readonly crearPedidoUseCase: CrearPedidoUseCase,
        private readonly consultarPedidoPorIdUseCase: ConsultarPedidoPorIdUseCase,
        private readonly consultarPedidosUseCase: ConsultarPedidosUseCase,
        private readonly editarPedidoUseCase: EditarPedidoUseCase,
        private readonly eliminarPedidoUseCase: EliminarPedidoUseCase,
        private readonly contarPedidosPendientesUseCase: ContarPedidosPendientesUseCase,
        private readonly consultarProximasEntregasUseCase: ConsultarProximasEntregasUseCase
    ) {}

    // Las rutas fijas deben declararse antes de ':id' para que no las capture ese parámetro
    @Get('pendientes/cantidad')
    async contarPendientes(): Promise<ApiResponseDTO<PedidosPendientesDTO>> {
        const result = await this.contarPedidosPendientesUseCase.execute();
        return ApiResponseDTO.success({
            data: { cantidad: result.data }
        });
    }

    @Get('proximas-entregas')
    async consultarProximasEntregas(
        @Query() query: GetProximasEntregasQueryParamDTO
    ): Promise<ApiResponseDTO<PedidoDTO[]>> {
        const result = await this.consultarProximasEntregasUseCase.execute({
            periodo: query.periodo,
            pagination: { page: query.page, pageSize: query.pageSize }
        });
        return ApiResponseDTO.success({
            data: result.data.map(p => PedidoDTOMapper.toDTO(p)),
            message: "Próximas entregas consultadas exitosamente",
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        });
    }

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

    @Put(':previousId')
    async editarPedido(
        @Param('previousId', ParseIntPipe) previousId: number,
        @Body() pedidoDto: EditPedidoDTO
    ): Promise<ApiResponseDTO<PedidoDTO>>{
        const result = await this.editarPedidoUseCase.execute({
            data: PedidoDTOMapper.toEditarData(pedidoDto),
            previousId
        });
        return ApiResponseDTO.success({
            data: PedidoDTOMapper.toDTO(result.data),
            message: 'Pedido editado correctamente'
        })
    }

    @Delete(':id')
    async eliminarPedido(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<void>>{
        await this.eliminarPedidoUseCase.execute({data: { id }});
        return ApiResponseDTO.success({
            message: 'Pedido eliminado correctamente'
        });
    }
}