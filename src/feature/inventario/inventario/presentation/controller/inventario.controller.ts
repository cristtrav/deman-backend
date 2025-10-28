import { CrearInventarioUseCase } from '@feature/inventario/inventario/application/usecase/crear-inventario.usecase';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { NewInventarioDTO } from '../dto/new-inventario.dto';
import { ApiResponseDTO } from '@core/presentation/dto/response/api-response.dto';
import { InventarioDTO } from '../dto/inventario.dto';
import { InventarioDTOMapper } from '../mapper/inventario-dto.mapper';
import { ConsultarInventariosUseCase } from '../../application/usecase/consultar-inventarios.usecase';
import { GetInventarioQueryParamDTO } from '../dto/http/get-inventario-query-param.dto';
import { GetQueryParamsMapper } from '@core/presentation/mapper/get-query-params.mapper';
import { PaginationApiMapper } from '@core/presentation/mapper/pagination-api.mapper';
import { EditarInventarioUseCase } from '../../application/usecase/editar-inventario.usecase';
import { EditInventarioDTO } from '../dto/edit-inventario.dto';

@Controller('inventarios')
export class InventarioController {

    constructor(
        private crearInventarioUseCase: CrearInventarioUseCase,
        private consultarInventariosUseCase: ConsultarInventariosUseCase,
        private editarInventarioUseCase: EditarInventarioUseCase
    ){}

    @Put(':previousId')
    async put(
        @Param('previousId', ParseIntPipe) previousId: number,
        @Body() editInventarioDto: EditInventarioDTO
    ): Promise<ApiResponseDTO<InventarioDTO>>{
        const result = await this.editarInventarioUseCase.execute({
            previousId,
            data: {
                id: editInventarioDto.id,
                fecha: new Date(`${editInventarioDto.fecha}T00:00:00`),
                detalles: editInventarioDto.detalles.map(detalleDto => ({
                    id: detalleDto.id,
                    idproducto: detalleDto.idproducto,
                    idvariante: detalleDto.idvariante,
                    cantidad: detalleDto.cantidad
                }))
            }
        })
        return ApiResponseDTO.success({ data: InventarioDTOMapper.toDTO(result.data) });
    }

    @Post()
    async post(
        @Body() newInventarioDto: NewInventarioDTO
    ): Promise<ApiResponseDTO<InventarioDTO>>{
        const result = await this.crearInventarioUseCase.execute({
            data: {
                fecha: new Date(`${newInventarioDto.fecha}T00:00:00`),
                detalles: newInventarioDto.detalles.map(detalleDto => ({
                    idproducto: detalleDto.idproducto,
                    idvariante: detalleDto.idvariante,
                    cantidad: detalleDto.cantidad
                }))
            }
        });
        return ApiResponseDTO.success({data: InventarioDTOMapper.toDTO(result.data)})
    }

    @Get()
    async get(
        @Query() query: GetInventarioQueryParamDTO
    ): Promise<ApiResponseDTO<InventarioDTO[]>>{
        const result = await this.consultarInventariosUseCase.execute(
            GetQueryParamsMapper.toQueryContract(query)
        );
        return ApiResponseDTO.success({
            data: result.data.map(inv => InventarioDTOMapper.toDTO(inv)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }
    
}
