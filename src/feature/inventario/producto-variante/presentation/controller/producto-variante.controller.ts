import { GetQueryParamsDTO } from '@core/presentation/dto/request/get-query-params.dto';
import { ApiResponseDTO } from '@core/presentation/dto/response/api-response.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ProductoVarianteDTO } from '../dto/producto-variante.dto';
import { ConsultarProductosVariantes } from '../../application/usecase/consultar-productos-variantes.usecase';
import { GetQueryParamsMapper } from '@core/presentation/mapper/get-query-params.mapper';
import { ProductoVarianteDTOMapper } from '../mapper/producto-variante-dto.mapper';
import { PaginationApiMapper } from '@core/presentation/mapper/pagination-api.mapper';

@Controller('productos-variantes')
export class ProductoVarianteController {

    constructor(
        private consultarProductosVariantesUseCase: ConsultarProductosVariantes
    ){}

    @Get()
    async get(
        @Query() params: GetQueryParamsDTO
    ): Promise<ApiResponseDTO<ProductoVarianteDTO[]>>{
        const result = await this.consultarProductosVariantesUseCase.execute(
            GetQueryParamsMapper.toQueryContract(params)
        );
        return ApiResponseDTO.success({
            data: result.data.map(productoVariante => ProductoVarianteDTOMapper.toDTO(productoVariante)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }
}
