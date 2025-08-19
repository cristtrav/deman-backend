import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MarcaDTO } from "../dto/marca.dto";
import { NewMarcaDTO } from "../dto/new-marca.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { EditarMarcaUseCase } from "../../application/usecase/editar.usecase";
import { BuscarMarcaPorNombreUseCase } from "../../application/usecase/buscar-por-nombre.usecase";
import { CrearMarcaUseCase } from "../../application/usecase/crear.usecase";
import { EliminarMarcaUseCase } from "../../application/usecase/eliminar.usecase";
import { ListarMarcasUseCase } from "../../application/usecase/listar.usecase";
import { ObtenerMarcaPorIdUseCase } from "../../application/usecase/obtener-por-id.usecase";

@Controller('marcas')
export class MarcaController {
    constructor(
        private readonly crearMarcaUseCase: CrearMarcaUseCase,
        private readonly editarMarcaUseCase: EditarMarcaUseCase,
        private readonly eliminarMarcaUseCase: EliminarMarcaUseCase,
        private readonly obtenerMarcaPorIdUseCase: ObtenerMarcaPorIdUseCase,
        private readonly buscarMarcaPorNombreUseCase: BuscarMarcaPorNombreUseCase,
        private readonly listarMarcasUseCase: ListarMarcasUseCase,
    ) { }

    @Post()
    async crearMarca(@Body() newMarcaDto: NewMarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const result = await this.crearMarcaUseCase.execute({
            data: {
                id: newMarcaDto.id,
                descripcion: newMarcaDto.descripcion
            }
        });
        return ApiResponseDTO.success({data: MarcaDTOMapper.toDTO(result.data), message: "Marca creada exitosamente"});
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
    async actualizarMarca(@Param('id', ParseIntPipe) id: number, @Body() marcaDto: MarcaDTO): Promise<ApiResponseDTO<MarcaDTO>> {
        const result = await this.editarMarcaUseCase.execute({
            data: {
                id: marcaDto.id,
                descripcion: marcaDto.descripcion
            }
        })
        return ApiResponseDTO.success({data: MarcaDTOMapper.toDTO(result.data), message: "Marca editada exitosamente"});
    }

    @Delete(':id')
    deleteMarca(@Param('id', ParseIntPipe) id: number): ApiResponseDTO<void> {
        this.eliminarMarcaUseCase.execute(id);
        return ApiResponseDTO.success({message: "Marca eliminada correctamente"});
    }
}