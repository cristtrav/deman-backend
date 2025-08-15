import { ApiResponseDTO } from "@core/presentation/dto/api-response.dto";
import { ActualizarColorUseCase } from "@feature/color/application/usecase/actualizar.usecase";
import { BuscarColorPorNombreUseCase } from "@feature/color/application/usecase/buscar-por-nombre.usecase";
import { CrearColorUseCase } from "@feature/color/application/usecase/crear.usecase";
import { EliminarColorUseCase } from "@feature/color/application/usecase/eliminar.usecase";
import { ObtenerColorPorIdUseCase } from "@feature/color/application/usecase/obtener-por-id.usecase";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { NewColorDto } from "../dto/new-color.dto";
import { ColorDTOMapper } from "../mapper/color-dto.mapper";
import { ColorDTO } from "../dto/color.dto";

@Controller('colores')
export class ColorController {
    constructor(
        private readonly crearColorUseCase: CrearColorUseCase,
        private readonly actualizarColorUseCase: ActualizarColorUseCase,
        private readonly eliminarColorUseCase: EliminarColorUseCase,
        private readonly obtenerColorPorIdUseCase: ObtenerColorPorIdUseCase,
        private readonly buscarColorPorNombreUseCase: BuscarColorPorNombreUseCase,
    ) { }

    @Post()
    async crearColor(@Body() colorDTO: NewColorDto): Promise<ApiResponseDTO<ColorDTO>> {
        const newColor = ColorDTOMapper.toDTO(await this.crearColorUseCase.execute(colorDTO.descripcion))
        return ApiResponseDTO.success(newColor);
    }

    @Get(':id')
    async obtenerColorPorId(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDTO<ColorDTO>> {
        const color = ColorDTOMapper.toDTO(await this.obtenerColorPorIdUseCase.execute(id));
        return ApiResponseDTO.success(color);
    }
    @Get('nombre/:descripcion')
    async buscarColorPorNombre(@Param('descripcion') descripcion: string): Promise<ApiResponseDTO<ColorDTO>> {
        const color = ColorDTOMapper.toDTO( await this.buscarColorPorNombreUseCase.execute(descripcion));
        return ApiResponseDTO.success(color);
    }

    @Put(':id')
    async actualizarColor(@Param('id', ParseIntPipe) id: number, @Body() color: ColorDTO): Promise<ApiResponseDTO<ColorDTO>> {
        const currentColor = ColorDTOMapper.toDomain(color);
        const colorToUpdate = await this.actualizarColorUseCase.execute(id, currentColor.getDescripcion());
        const updatedColor = ColorDTOMapper.toDTO(colorToUpdate);
        return ApiResponseDTO.success(updatedColor);
    }

    @Delete(':id')
    deleteColor(@Param('id', ParseIntPipe) id: number): ApiResponseDTO<void> {
        this.eliminarColorUseCase.execute(id);
        return ApiResponseDTO.success(undefined, "Color eliminado correctamente");
    }
}