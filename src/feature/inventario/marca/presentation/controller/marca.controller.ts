import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { MarcaDTO } from "../dto/marca.dto";
import { NewMarcaDTO } from "../dto/new-marca.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { EditarMarcaUseCase } from "../../application/usecase/editar.usecase";
import { CrearMarcaUseCase } from "../../application/usecase/crear.usecase";
import { EliminarMarcaUseCase } from "../../application/usecase/eliminar.usecase";
import { ConsultarMarcasUseCase } from "../../application/usecase/consultar.usecase";
import { GetMarcaQueryParamDTO } from "../dto/http/get-marca-query-param.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { ConsultarMarcaPorIdUseCase } from "../../application/usecase/consultar-por-id.usecase";

@Controller('marcas')
export class MarcaController {
    constructor(
        private readonly crearMarcaUseCase: CrearMarcaUseCase,
        private readonly editarMarcaUseCase: EditarMarcaUseCase,
        private readonly eliminarMarcaUseCase: EliminarMarcaUseCase,
        private readonly consultarMarcasUseCase: ConsultarMarcasUseCase,
        private readonly consultarMarcaPorIdUseCase: ConsultarMarcaPorIdUseCase
    ) { }

    @Post()
    async crearMarca(@Body() newMarcaDto: NewMarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const result = await this.crearMarcaUseCase.execute({
            data: {
                id: newMarcaDto.id,
                descripcion: newMarcaDto.descripcion
            }
        });
        return ApiResponseDTO.success({
            data: MarcaDTOMapper.toDTO(result.data),
            message: "Marca creada exitosamente"
        });
    }

    @Get()
    async consultarMarcas(
        @Query() queryParams: GetMarcaQueryParamDTO
    ): Promise<ApiResponseDTO<MarcaDTO[]>> {
        const result = await this.consultarMarcasUseCase.execute(GetQueryParamsMapper.toQueryContract(queryParams));
        return ApiResponseDTO.success({
            data: result.data.map(m => MarcaDTOMapper.toDTO(m)),
            message: "Marcas listadas exitosamente",
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        });
    }

    @Get(':id')
    async obtenerMarcaPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<MarcaDTO>> {
        const marca = await this.consultarMarcaPorIdUseCase.execute(id);
        const marcaDto = MarcaDTOMapper.toDTO(marca);
        return ApiResponseDTO.success({
            data: marcaDto,
            message: "Marca obtenida exitosamente"
        });
    }

    @Put(':id')
    async actualizarMarca(@Param('id', ParseIntPipe) id: number, @Body() marcaDto: MarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const result = await this.editarMarcaUseCase.execute({
            data: {
                id: marcaDto.id,
                descripcion: marcaDto.descripcion
            }
        })
        return ApiResponseDTO.success({
            data: MarcaDTOMapper.toDTO(result.data),
            message: "Marca editada exitosamente"
        });
    }

    @Delete(':id')
    async deleteMarca(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<void>> {
        await this.eliminarMarcaUseCase.execute({
            data: { id }
        });
        return ApiResponseDTO.success({ message: "Marca eliminada correctamente" });
    }
}