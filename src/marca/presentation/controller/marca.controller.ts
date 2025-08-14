import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from "@nestjs/common";
import { ActualizarMarcaUseCase } from "src/marca/application/use-case/actualizar.use-case";
import { BuscarMarcaPorNombreUseCase } from "src/marca/application/use-case/buscar-por-nombre.use-case";
import { CrearMarcaUseCase } from "src/marca/application/use-case/crear.use-case";
import { EliminarMarcaUseCase } from "src/marca/application/use-case/eliminar.use-case";
import { ListarMarcasUseCase } from "src/marca/application/use-case/listar.use-case";
import { ObtenerMarcaPorIdUseCase } from "src/marca/application/use-case/obtener-por-id.use-case";
import { MarcaDTO } from "../dto/marca.dto";
import { NewMarcaDTO } from "../dto/new-marca.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";
import { ApiResponseDTO } from "@core/presentation/dto/api-response.dto";

@Controller('marcas')
export class MarcaController {
    constructor(
        private readonly crearMarcaUseCase: CrearMarcaUseCase,
        private readonly actualizarMarcaUseCase: ActualizarMarcaUseCase,
        private readonly eliminarMarcaUseCase: EliminarMarcaUseCase,
        private readonly obtenerMarcaPorIdUseCase: ObtenerMarcaPorIdUseCase,
        private readonly buscarMarcaPorNombreUseCase: BuscarMarcaPorNombreUseCase,
        private readonly listarMarcasUseCase: ListarMarcasUseCase,
    ) { }

    @Post()
    async crearMarca(@Body() marcaDTO: NewMarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const newMarca = MarcaDTOMapper.toDTO(await this.crearMarcaUseCase.execute(marcaDTO.descripcion))
        return ApiResponseDTO.success(newMarca, "Marca creada exitosamente");
    }

    @Get()
    async listarMarcas(): Promise<ApiResponseDTO<MarcaDTO[]>> {
        const marcaDTO = (await this.listarMarcasUseCase.execute()).map(marca => MarcaDTOMapper.toDTO(marca));
        return ApiResponseDTO.success(marcaDTO, "Marcas listadas exitosamente");
    }

    @Get(':id')
    async obtenerMarcaPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<MarcaDTO>> {
        const marca = MarcaDTOMapper.toDTO(await this.obtenerMarcaPorIdUseCase.execute(id));
        return ApiResponseDTO.success(marca, "Marca obtenida exitosamente");
    }
    @Get('nombre/:descripcion')
    async buscarMarcaPorNombre(@Param('descripcion') descripcion: string): Promise<ApiResponseDTO<MarcaDTO>> {
        const marca = MarcaDTOMapper.toDTO( await this.buscarMarcaPorNombreUseCase.execute(descripcion));
        return ApiResponseDTO.success(marca, "Marca obtenida exitosamente");
    }

    @Put(':id')
    async actualizarMarca(@Param('id', ParseIntPipe) id: number, @Body() marca: MarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const marcaActual = MarcaDTOMapper.toDomain(marca);
        const marcaParaActualizar = await this.actualizarMarcaUseCase.execute(id, marcaActual.getDescripcion());
        const marcaActualizada = MarcaDTOMapper.toDTO(marcaParaActualizar);
        return ApiResponseDTO.success(marcaActualizada, "Marcas listadas exitosamente");
    }

    @Delete(':id')
    deleteReason(@Param('id', ParseIntPipe) id: number): ApiResponseDTO<void> {
        this.eliminarMarcaUseCase.execute(id);
        return ApiResponseDTO.success(undefined, "Marca eliminada correctamente");
    }
}