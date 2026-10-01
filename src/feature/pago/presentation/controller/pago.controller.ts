import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { ConsultarPagosUseCase } from "@feature/pago/application/usecase/consultar-pagos.usecase";
import { CrearPagoUseCase } from "@feature/pago/application/usecase/crear-pago.usecase";
import { EditarPagoUseCase } from "@feature/pago/application/usecase/editar-pago.usecase";
import { EliminarPagoUseCase } from "@feature/pago/application/usecase/eliminar-pago.usecase";
import { PagoDTO } from "../dto/pago.dto";
import { NewPagoDTO } from "../dto/new-pago.dto";
import { EditPagoDTO } from "../dto/edit-pago.dto";
import { GetPagosQueryParamDTO } from "../dto/http/get-pagos-query-param.dto";
import { PagoDTOMapper } from "../mapper/pago-dto.mapper";

@Controller('pagos')
export class PagoController {
    constructor(
        private readonly consultarPagosUseCase: ConsultarPagosUseCase,
        private readonly crearPagoUseCase: CrearPagoUseCase,
        private readonly editarPagoUseCase: EditarPagoUseCase,
        private readonly eliminarPagoUseCase: EliminarPagoUseCase
    ) {}

    @Get()
    async consultarPagos(
        @Query() query: GetPagosQueryParamDTO
    ): Promise<ApiResponseDTO<PagoDTO[]>> {
        const result = await this.consultarPagosUseCase.execute(GetQueryParamsMapper.toQueryContract(query));
        return ApiResponseDTO.success({
            data: result.data.map(p => PagoDTOMapper.toDTO(p)),
            message: "Pagos consultados exitosamente",
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        });
    }

    @Post()
    async crearPago(@Body() newPagoDto: NewPagoDTO): Promise<ApiResponseDTO<PagoDTO>> {
        const result = await this.crearPagoUseCase.execute({
            data: PagoDTOMapper.toCrearData(newPagoDto)
        });
        return ApiResponseDTO.success({
            data: PagoDTOMapper.toDTO(result.data),
            message: "Pago creado exitosamente"
        });
    }

    @Put(':previousId')
    async editarPago(
        @Param('previousId', ParseIntPipe) previousId: number,
        @Body() pagoDto: EditPagoDTO
    ): Promise<ApiResponseDTO<PagoDTO>> {
        const result = await this.editarPagoUseCase.execute({
            data: PagoDTOMapper.toEditarData(pagoDto),
            previousId
        });
        return ApiResponseDTO.success({
            data: PagoDTOMapper.toDTO(result.data),
            message: 'Pago editado correctamente'
        });
    }

    @Delete(':id')
    async eliminarPago(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<void>> {
        await this.eliminarPagoUseCase.execute({data: { id }});
        return ApiResponseDTO.success({
            message: 'Pago eliminado correctamente'
        });
    }
}
