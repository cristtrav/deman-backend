import { ActualizarTipoUseCase } from "@feature/tipo/application/usecase/actualizar.usecase";
import { BuscarTipoPorNombreUseCase } from "@feature/tipo/application/usecase/buscar-por-nombre.usecase";
import { CrearTipoUseCase } from "@feature/tipo/application/usecase/crear.usecase";
import { EliminarTipoUseCase } from "@feature/tipo/application/usecase/eliminar.usecase";
import { ObtenerTipoPorIdUseCase } from "@feature/tipo/application/usecase/obtener-por-id.usecase";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TipoDTO } from "../dto/tipo.dto";
import { TipoDTOMapper } from "../mapper/tipo-dto.mapper";
import { ApiResponseDTO } from "@core/presentation/dto/api-response.dto";

@Controller('tipos')
export class TipoController {
    constructor(
        private readonly crearTipoUseCase: CrearTipoUseCase,
        private readonly actualizarTipoUseCase: ActualizarTipoUseCase,
        private readonly eliminarTipoUseCase: EliminarTipoUseCase,
        private readonly obtenerTipoPorIdUseCase: ObtenerTipoPorIdUseCase,
        private readonly buscarTipoPorNombreUseCase: BuscarTipoPorNombreUseCase,
    ) { }

    @Post()
    async crearTipo(@Body() tipoDTO: TipoDTO): Promise<ApiResponseDTO<TipoDTO>> {
        const newTipo = TipoDTOMapper.toDTO(await this.crearTipoUseCase.execute(tipoDTO.descripcion))
        return ApiResponseDTO.success(newTipo);
    }

    @Get(':id')
    async obtenertipoPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<TipoDTO>> {
        const tipo = TipoDTOMapper.toDTO(await this.obtenerTipoPorIdUseCase.execute(id));
        return ApiResponseDTO.success(tipo);
    }
    @Get('nombre/:descripcion')
    async buscartipoPorNombre(@Param('descripcion') descripcion: string): Promise<ApiResponseDTO<TipoDTO>> {
        const tipo = TipoDTOMapper.toDTO( await this.buscarTipoPorNombreUseCase.execute(descripcion));
        return ApiResponseDTO.success(tipo);
    }

    @Put(':id')
    async actualizartipo(@Param('id', ParseIntPipe) id: number, @Body() tipo: TipoDTO): Promise<ApiResponseDTO<TipoDTO>> {
        const currentTipo = TipoDTOMapper.toDomain(tipo);
        const tipoToUpdate = await this.actualizarTipoUseCase.execute(id, currentTipo.getDescripcion());
        const updatedTipo = TipoDTOMapper.toDTO(tipoToUpdate);
        return ApiResponseDTO.success(updatedTipo);
    }

    @Delete(':id')
    deleteTipo(@Param('id', ParseIntPipe) id: number): ApiResponseDTO<void> {
        this.eliminarTipoUseCase.execute(id);
        return ApiResponseDTO.success(undefined, "Tipo eliminado correctamente");
    }
}