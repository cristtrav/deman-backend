import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { ConsultarPagosUseCase } from "@feature/pago/application/usecase/consultar-pagos.usecase";
import { CrearPagoUseCase } from "@feature/pago/application/usecase/crear-pago.usecase";
import { AnularPagoUseCase } from "@feature/pago/application/usecase/anular-pago.usecase";
import { PagoDTO } from "../dto/pago.dto";
import { NewPagoDTO } from "../dto/new-pago.dto";
import { AnularPagoDTO } from "../dto/anular-pago.dto";
import { GetPagosQueryParamDTO } from "../dto/http/get-pagos-query-param.dto";
import { PagoDTOMapper } from "../mapper/pago-dto.mapper";

@Controller('pagos')
export class PagoController {
    constructor(
        private readonly consultarPagosUseCase: ConsultarPagosUseCase,
        private readonly crearPagoUseCase: CrearPagoUseCase,
        private readonly anularPagoUseCase: AnularPagoUseCase
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
            message: `Pago registrado. Recibo Nº ${result.data.numeroRecibo}`
        });
    }

    // Los pagos no se editan: para corregir uno se anula y se registra uno nuevo
    @Post(':id/anulacion')
    async anularPago(
        @Param('id', ParseIntPipe) id: number,
        @Body() anularPagoDto: AnularPagoDTO
    ): Promise<ApiResponseDTO<void>> {
        await this.anularPagoUseCase.execute({data: { id, motivo: anularPagoDto.motivo }});
        return ApiResponseDTO.success({
            message: 'Pago anulado correctamente'
        });
    }
}
