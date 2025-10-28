import { GetQueryParamsDTO } from '@core/presentation/dto/request/get-query-params.dto';
import { ApiResponseDTO } from '@core/presentation/dto/response/api-response.dto';
import { ConsultarProductosUseCase } from '@feature/inventario/producto/application/usecase/consultar-productos.usecase';
import { Controller, Get, Query } from '@nestjs/common';
import { ProductoVarianteDTO } from '../dto/producto-variante.dto';

@Controller('productos-variantes')
export class ProductoVarianteController {

    constructor(
        private consultarProductosVariantesUseCase: ConsultarProductosUseCase
    ){}

    /*@Get()
    async get(
        @Query() params: GetQueryParamsDTO
    ): Promise<ApiResponseDTO<ProductoVarianteDTO>>{
        
    }*/
}
