import { ApiResponseDTO } from '@core/presentation/dto/response/api-response.dto';
import { ConsultarUnidadesMedidasUseCase } from '@feature/unidad-medida/application/usecase/consultar-unidades-medidas.usecase';
import { Controller, Get, Query } from '@nestjs/common';
import { UnidadMedidaDTO } from '../dto/unidad-medida.dto';
import { GetQueryParamsDTO } from '@core/presentation/dto/request/get-query-params.dto';
import { GetQueryParamsMapper } from '@core/presentation/mapper/get-query-params.mapper';
import { UnidadMedidaDTOMapper } from '../mapper/unidad-medida-dto.mapper';
import { PaginationApiMapper } from '@core/presentation/mapper/pagination-api.mapper';

@Controller('unidades-medidas')
export class UnidadMedidaController {

    constructor(
        private consultarUnidadesMedidasUseCase: ConsultarUnidadesMedidasUseCase
    ){}

    @Get()
    async get(
        @Query() query: GetQueryParamsDTO
    ): Promise<ApiResponseDTO<UnidadMedidaDTO[]>>{
        const dataRes = await this.consultarUnidadesMedidasUseCase.execute(GetQueryParamsMapper.toQueryContract(query));
        return ApiResponseDTO.success({
            data: dataRes.data.map(um => UnidadMedidaDTOMapper.toDTO(um)),
            pagination: dataRes.page != null ? PaginationApiMapper.toApiResponsePaginationDTO(dataRes.page) : undefined
        })
    }

}
