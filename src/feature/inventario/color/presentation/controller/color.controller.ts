import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CrearColorUseCase } from "../../application/usecase/crear.usecase";
import { EditarColorUseCase } from "../../application/usecase/editar.usecase";
import { EliminarColorUseCase } from "../../application/usecase/eliminar.usecase";
import { ConsultarColoresUseCase } from "../../application/usecase/consultar.usecase";
import { ConsultarColorPorIdUseCase } from "../../application/usecase/consultar-por-id.usecase";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { ColorDTOMapper } from "../mapper/color-dto.mapper";
import { NewColorDto } from "../dto/new-color.dto";
import { ColorDTO } from "../dto/color.dto";
import { GetColorQueryParamDTO } from "../dto/http/get-color-query-param.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";

@Controller('colores')
export class ColorController {
    constructor(
        private readonly crearColorUseCase: CrearColorUseCase,
        private readonly editarColorUseCase: EditarColorUseCase,
        private readonly eliminarColorUseCase: EliminarColorUseCase,
        private readonly consultarColorUseCase: ConsultarColoresUseCase,
        private readonly consultarColorPorIdUseCase: ConsultarColorPorIdUseCase
    ) { }

    @Post()
    async crearColor(
        @Body() newColor: NewColorDto
    ): Promise<ApiResponseDTO<ColorDTO>> {
        const result = (await this.crearColorUseCase.execute({
            data: {
                id: newColor.id,
                descripcion: newColor.descripcion
            }
        }));
        return ApiResponseDTO.success({ data: ColorDTOMapper.toDTO(result.data) });
    }

    @Get()
    async consultarColores(
        @Query() queryParams: GetColorQueryParamDTO
    ): Promise<ApiResponseDTO<ColorDTO[]>> {
        const result = await this.consultarColorUseCase.execute(GetQueryParamsMapper.toQueryContract(queryParams));
        return ApiResponseDTO.success({
            data: result.data.map(m => ColorDTOMapper.toDTO(m)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }

    @Get(':id')
    async obtenerColorPorId(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<ColorDTO>> {
        const color = await this.consultarColorPorIdUseCase.execute(id);
        const colorDto = ColorDTOMapper.toDTO(color)
        return ApiResponseDTO.success({ data: colorDto });
    }

    @Put(':id')
    async editarColor(
        @Param('id', ParseIntPipe) id: number,
        @Body() colorDto: ColorDTO
    ): Promise<ApiResponseDTO<ColorDTO>> {
        const result = await this.editarColorUseCase.execute({
            data: {
                id: id,
                descripcion: colorDto.descripcion
            }
        });
        return ApiResponseDTO.success({ data: ColorDTOMapper.toDTO(result.data) });
    }

    @Delete(':id')
    async deleteColor(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<void>> {
        await this.eliminarColorUseCase.execute({
            data: { id }
        });
        return ApiResponseDTO.success()
    }
}