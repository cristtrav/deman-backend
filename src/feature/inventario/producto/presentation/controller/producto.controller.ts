import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CrearProductoUseCase } from '../../application/usecase/crear-producto.usecase';
import { ApiResponseDTO } from '@core/presentation/dto/response/api-response.dto';
import { NewProductoDTO } from '../dto/new-producto.dto';
import { ProductoDTO } from '../dto/producto.dto';
import { ProductoDTOMapper } from '../mapper/producto-dto.mapper';
import { ConsultarProductosUseCase } from '../../application/usecase/consultar-productos.usecase';
import { GetQueryParamsMapper } from '@core/presentation/mapper/get-query-params.mapper';
import { GetQueryParamsDTO } from '@core/presentation/dto/request/get-query-params.dto';
import { PaginationApiMapper } from '@core/presentation/mapper/pagination-api.mapper';
import { EditarProductoUseCase } from '../../application/usecase/editar-producto.usecase';
import { EditProductoDTO } from '../dto/edit-producto.dto';
import { EliminarProductoUseCase } from '../../application/usecase/eliminar-producto.usecase';

@Controller('productos')
export class ProductoController {

    constructor(
        private eliminarProductoUseCase: EliminarProductoUseCase,
        private editarProductoUseCase: EditarProductoUseCase,
        private crearProductoUseCase: CrearProductoUseCase,
        private consultarProductosUseCase: ConsultarProductosUseCase
    ){}

    @Delete(":id")
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<void>>{
        await this.eliminarProductoUseCase.execute({ data: { id }});
        return ApiResponseDTO.success();
    }

    @Put(":previousId")
    async put(
        @Param("previousId", ParseIntPipe) previousId: number,
        @Body() productoDto: EditProductoDTO
    ): Promise<ApiResponseDTO<ProductoDTO>>{
        const result = await this.editarProductoUseCase.execute({
            previousId: previousId,
            data: {
                id: productoDto.id,
                descripcion: productoDto.descripcion,
                precio: productoDto.precio,
                idmarca: productoDto.idmarca,
                idtipo: productoDto.idtipo,
                idcategoria: productoDto.idcategoria,
                idunidadMedida: productoDto.idunidadMedida
            }
        })
        return ApiResponseDTO.success({
            data: ProductoDTOMapper.toDTO(result.data)
        })
    }

    @Get()
    async get(
        @Query() queryParams: GetQueryParamsDTO
    ): Promise<ApiResponseDTO<ProductoDTO[]>>{
        const result = await this.consultarProductosUseCase.execute(
            GetQueryParamsMapper.toQueryContract(queryParams)
        );
        
        return ApiResponseDTO.success({
            data: result.data.map(pr => ProductoDTOMapper.toDTO(pr)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }

    @Post()
    async post(
        @Body()  newProductoDTO: NewProductoDTO
    ): Promise<ApiResponseDTO<ProductoDTO>>{
        const result = await this.crearProductoUseCase.execute({ data: {
            id: newProductoDTO.id,
            descripcion: newProductoDTO.descripcion,
            precio: newProductoDTO.precio,
            idmarca: newProductoDTO.idmarca,
            idcategoria: newProductoDTO.idcategoria,
            idtipo: newProductoDTO.idtipo,
            idunidadMedida: newProductoDTO.idunidadMedida
        }});
        return ApiResponseDTO.success({
            data: ProductoDTOMapper.toDTO(result.data)
        })
    }

}
