import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from "@nestjs/common";
import { ApiResponse } from "src/core/presentation/response/api-response.dto";
import { ActualizarMarcaUseCase } from "src/marca/application/use-case/actualizar.use-case";
import { BuscarMarcaPorNombreUseCase } from "src/marca/application/use-case/buscar-por-nombre.use-case";
import { ContarMarcasUseCase } from "src/marca/application/use-case/contar.use-case";
import { CrearMarcaUseCase } from "src/marca/application/use-case/crear.use-case";
import { EliminarMarcaUseCase } from "src/marca/application/use-case/eliminar.use-case";
import { ListarMarcasUseCase } from "src/marca/application/use-case/listar.use-case";
import { ObtenerMarcaPorIdUseCase } from "src/marca/application/use-case/obtener-por-id.use-case";
import { GlobalExceptionFilter } from "src/marca/infrastructure/exception-filter/exception-filter";
import { MarcaDTO } from "../dto/marca.dto";
import { NewMarcaDTO } from "../dto/new-marca.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";

@UseFilters(GlobalExceptionFilter)
@Controller('marcas')
export class MarcaController {
    constructor(
        private readonly crearMarcaUseCase: CrearMarcaUseCase,
        private readonly actualizarMarcaUseCase: ActualizarMarcaUseCase,
        private readonly eliminarMarcaUseCase: EliminarMarcaUseCase,
        private readonly obtenerMarcaPorIdUseCase: ObtenerMarcaPorIdUseCase,
        private readonly buscarMarcaPorNombreUseCase: BuscarMarcaPorNombreUseCase,
        private readonly listarMarcasUseCase: ListarMarcasUseCase,
        //private readonly contarMarcasUseCase: ContarMarcasUseCase
    ) { }

    @Post()
    async crearMarca(@Body() marcaDTO: NewMarcaDTO): Promise<ApiResponse<MarcaDTO>> {
        const newMarca = MarcaDTOMapper.toDTO(await this.crearMarcaUseCase.execute(marcaDTO.descripcion))
        return {
            success: true,
            message: "Marca creada exitosamente",
            data: newMarca
        }
    }
    @Get()
    async listarMarcas(): Promise<ApiResponse<MarcaDTO>> {
        console.log('Controller')
        const marcaDTO = (await this.listarMarcasUseCase.execute()).map(marca => MarcaDTOMapper.toDTO(marca));
        return {
            success: true,
            message: "Marcas listadas exitosamente",
            data: marcaDTO
        }
    }

    @Get(':id')
    async obtenerMarcaPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<MarcaDTO>> {
        const marca = MarcaDTOMapper.toDTO(await this.obtenerMarcaPorIdUseCase.execute(id));
        return {
            success: true,
            message: "Marca obtenida exitosamente",
            data: marca
        }
    }
    @Get('nombre/:descripcion')
    async buscarMarcaPorNombre(@Param('descripcion') descripcion: string): Promise<ApiResponse<MarcaDTO>> {
        const marca = MarcaDTOMapper.toDTO( await this.buscarMarcaPorNombreUseCase.execute(descripcion));
        return {
            success: true,
            message: 'Marca obtenida exitosamente',
            data: marca
        };
    }

    @Put(':id')
    async actualizarMarca(@Param('id', ParseIntPipe) id: number, @Body() marca: MarcaDTO): Promise<ApiResponse<MarcaDTO>> {
        const marcaActual = MarcaDTOMapper.toDomain(marca);
        const marcaParaActualizar = await this.actualizarMarcaUseCase.execute(id, marcaActual.getDescripcion());
        const marcaActualizada = MarcaDTOMapper.toDTO(marcaParaActualizar);
        return {
            success: true,
            message: "Marcas listadas exitosamente",
            data: marcaActualizada
        }
    }

    @Delete(':id')
    deleteReason(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.eliminarMarcaUseCase.execute(id);
    }
}