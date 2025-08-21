import { ApiResponseDTO } from '@core/presentation/dto/response/api-response.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CategoriaDTO } from '../dto/categoria.dto';
import { NewCategoriaDTO } from '../dto/new-categoria.dto';
import { CrearCategoriaUseCase } from '../../application/usecase/crear.usecase';
import { CategoriaDTOMapper } from '../mapper/categoria-dto.mapper';
import { ConsultarCategoriasUseCase } from '../../application/usecase/consultar.usecase';
import { EditarCategoriaUseCase } from '../../application/usecase/editar.usecase';
import { EliminarCategoriaUseCase } from '../../application/usecase/eliminar.usecase';
import { PaginationApiMapper } from '@core/presentation/mapper/pagination-api.mapper';
import { CategoriasGetQueryParamDTO } from '../dto/http/get-categorias-query-param.dto';
import { GetQueryParamsMapper } from '@core/presentation/mapper/get-query-params.mapper';

@Controller('categorias')
export class CategoriaController {

    constructor(
        private readonly crearCategoriaUseCase: CrearCategoriaUseCase,
        private readonly consultarCategoriasUseCase: ConsultarCategoriasUseCase,
        private readonly editarCategoriaUseCase: EditarCategoriaUseCase,
        private readonly eliminarCategoriaUseCase: EliminarCategoriaUseCase
    ){ }

    @Get()
    async get(
        @Query() queryParams: CategoriasGetQueryParamDTO
    ): Promise<ApiResponseDTO<CategoriaDTO[]>>{
        const result = await this.consultarCategoriasUseCase.execute(GetQueryParamsMapper.toQueryContract(queryParams));
        const dataDto = result.data.map(c => CategoriaDTOMapper.toDto(c));
        return ApiResponseDTO.success({
            data: dataDto,
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        });
    }

    @Post()
    async post(
        @Body() newCategoria: NewCategoriaDTO
    ): Promise<ApiResponseDTO<CategoriaDTO>>{
        const result = await this.crearCategoriaUseCase.execute({
            data: {
                id: newCategoria.id,
                descripcion: newCategoria.descripcion
            }
        });
        return ApiResponseDTO.success({data: CategoriaDTOMapper.toDto(result.data)});
    }

    @Put(':id')
    async put(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoriaDto: CategoriaDTO
    ): Promise<ApiResponseDTO<CategoriaDTO>>{
        const result = await this.editarCategoriaUseCase.execute({
            data: {
                id: categoriaDto.id,
                descripcion: categoriaDto.descripcion    
            }
        });
        return ApiResponseDTO.success({data: CategoriaDTOMapper.toDto(result.data)});
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<void>>{
        await this.eliminarCategoriaUseCase.execute({
            data: { id }
        });
        return ApiResponseDTO.success();
    }
}
