import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MarcaDTO } from "../dto/marca.dto";
import { NewMarcaDTO } from "../dto/new-marca.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { ActualizarMarcaUseCase } from "@feature/marca/application/usecase/actualizar.usecase";
import { BuscarMarcaPorNombreUseCase } from "@feature/marca/application/usecase/buscar-por-nombre.usecase";
import { CrearMarcaUseCase } from "@feature/marca/application/usecase/crear.usecase";
import { EliminarMarcaUseCase } from "@feature/marca/application/usecase/eliminar.usecase";
import { ListarMarcasUseCase } from "@feature/marca/application/usecase/listar.usecase";
import { ObtenerMarcaPorIdUseCase } from "@feature/marca/application/usecase/obtener-por-id.usecase";

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
        return ApiResponseDTO.success({data: newMarca, message: "Marca creada exitosamente"});
    }

    @Get()
    async listarMarcas(): Promise<ApiResponseDTO<MarcaDTO[]>> {
        const marcaDTO = (await this.listarMarcasUseCase.execute()).map(marca => MarcaDTOMapper.toDTO(marca));
        return ApiResponseDTO.success({data: marcaDTO, message: "Marcas listadas exitosamente"});
    }

    @Get(':id')
    async obtenerMarcaPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<MarcaDTO>> {
        const marca = MarcaDTOMapper.toDTO(await this.obtenerMarcaPorIdUseCase.execute(id));
        return ApiResponseDTO.success({data: marca, message: "Marca obtenida exitosamente"});
    }
    @Get('nombre/:descripcion')
    async buscarMarcaPorNombre(@Param('descripcion') descripcion: string): Promise<ApiResponseDTO<MarcaDTO>> {
        const marca = MarcaDTOMapper.toDTO( await this.buscarMarcaPorNombreUseCase.execute(descripcion));
        return ApiResponseDTO.success({data: marca, message: "Marca obtenida exitosamente"});
    }

    @Put(':id')
    async actualizarMarca(@Param('id', ParseIntPipe) id: number, @Body() marca: MarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const marcaActual = MarcaDTOMapper.toDomain(marca);
        const marcaParaActualizar = await this.actualizarMarcaUseCase.execute(id, marcaActual.getDescripcion());
        const marcaActualizada = MarcaDTOMapper.toDTO(marcaParaActualizar);
        return ApiResponseDTO.success({data: marcaActualizada, message: "Marca actualizada exitosamente"});
    }

    @Delete(':id')
    deleteMarca(@Param('id', ParseIntPipe) id: number): ApiResponseDTO<void> {
        this.eliminarMarcaUseCase.execute(id);
        return ApiResponseDTO.success({message: "Marca eliminada correctamente"});
    }
}