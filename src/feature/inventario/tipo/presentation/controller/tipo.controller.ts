import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { TipoDTO } from "../dto/tipo.dto";
import { TipoDTOMapper } from "../mapper/tipo-dto.mapper";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { NewTipoDTO } from "../dto/new-tipo.dto";
import { CrearTipoUseCase } from "../../application/usecase/crear.usecase";
import { EditarTipoUseCase } from "../../application/usecase/editar.usecase";
import { EliminarTipoUseCase } from "../../application/usecase/eliminar.usecase";
import { ConsultarTiposUseCase } from "../../application/usecase/consultar.usecase";
import { ConsultarTipoPorIdUseCase } from "../../application/usecase/consultar-por-id.usecase";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { GetTipoQueryParamDTO } from "../dto/http/get-tipo-query-param.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";

@Controller('tipos')
export class TipoController {
    constructor(
        private readonly crearTipoUseCase: CrearTipoUseCase,
        private readonly editarTipoUseCase: EditarTipoUseCase,
        private readonly eliminarTipoUseCase: EliminarTipoUseCase,
        private readonly consultarTiposUseCase: ConsultarTiposUseCase,
        private readonly consultarTipoPorIdUseCase: ConsultarTipoPorIdUseCase
    ) { }

    @Post()
    async crearTipo(
        @Body() newTipo: NewTipoDTO
    ): Promise<ApiResponseDTO<TipoDTO>> {
        const result = (await this.crearTipoUseCase.execute({
            data: {
                id: newTipo.id,
                descripcion: newTipo.descripcion
            }
        }));
        return ApiResponseDTO.success({ data: TipoDTOMapper.toDTO(result.data) });
    }

    @Get()
    async consultarTipos(
        @Query() queryParams: GetTipoQueryParamDTO
    ): Promise<ApiResponseDTO<TipoDTO[]>> {
        const result = await this.consultarTiposUseCase.execute(GetQueryParamsMapper.toQueryContract(queryParams));
        return ApiResponseDTO.success({
            data: result.data.map(m => TipoDTOMapper.toDTO(m)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }

    @Get(':id')
    async obtenerTipoPorId(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<TipoDTO>> {
        const tipo = await this.consultarTipoPorIdUseCase.execute(id);
        const tipoDto = TipoDTOMapper.toDTO(tipo)
        return ApiResponseDTO.success({ data: tipoDto });
    }

    @Put(':id')
    async editarTipo(
        @Param('id', ParseIntPipe) id: number,
        @Body() tipoDto: TipoDTO
    ): Promise<ApiResponseDTO<TipoDTO>> {
        const result = await this.editarTipoUseCase.execute({
            data: {
                id: id,
                descripcion: tipoDto.descripcion
            }
        });
        return ApiResponseDTO.success({ data: TipoDTOMapper.toDTO(result.data) });
    }

    @Delete(':id')
    async deleteTipo(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<void>> {
        await this.eliminarTipoUseCase.execute({
            data: { id }
        });
        return ApiResponseDTO.success()
    }
}