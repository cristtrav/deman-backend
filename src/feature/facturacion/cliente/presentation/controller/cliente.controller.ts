import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { EliminarClienteUseCase } from "../../application/usecase/eliminar-cliente.usecase";
import { EditarClienteUseCase } from "../../application/usecase/editar-cliente.usecase";
import { CrearClienteUseCase } from "../../application/usecase/crear-cliente.usecase";
import { ConsultarClientesUseCase } from "../../application/usecase/consultar-clientes.usecase";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { ClienteDTO } from "../dto/cliente.dto";
import { ClienteDTOMapper } from "../mapper/cliente-dto.mapper";
import { GetQueryParamsDTO } from "@core/presentation/dto/request/get-query-params.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { NewCliente } from "../../domain/model/new-cliente";
import { NewClienteDTO } from "../dto/new-cliente.dto";

@Controller('clientes')
export class ClienteController {

    constructor(
        private eliminarClienteUseCase: EliminarClienteUseCase,
        private editarClienteUseCase: EditarClienteUseCase,
        private crearClienteUseCase: CrearClienteUseCase,
        private consultarClientesUseCase: ConsultarClientesUseCase
    ) { }

    @Delete(":id")
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<void>> {
        await this.eliminarClienteUseCase.execute({ data: { id } });
        return ApiResponseDTO.success();
    }

    @Put(":previousId")
    async put(
        @Param("previousId", ParseIntPipe) previousId: number,
        @Body() clienteDto: ClienteDTO
    ): Promise<ApiResponseDTO<ClienteDTO>> {
        const result = await this.editarClienteUseCase.execute({
            previousId: previousId,
            data: {
                id: clienteDto.id,
                razonSocial: clienteDto.razonSocial,
                ruc: clienteDto.ruc,
                telefono: clienteDto.telefono,
            }
        })
        return ApiResponseDTO.success({
            data: ClienteDTOMapper.toDTO(result.data)
        })
    }

    @Get()
    async get(
        @Query() queryParams: GetQueryParamsDTO
    ): Promise<ApiResponseDTO<ClienteDTO[]>> {
        const result = await this.consultarClientesUseCase.execute(
            GetQueryParamsMapper.toQueryContract(queryParams)
        );

        return ApiResponseDTO.success({
            data: result.data.map(pr => ClienteDTOMapper.toDTO(pr)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }

    @Post()
    async post(
        @Body() newClienteDTO: NewClienteDTO
    ): Promise<ApiResponseDTO<ClienteDTO>> {
        const result = await this.crearClienteUseCase.execute({
            data: {
                id: newClienteDTO.id,
                razonSocial: newClienteDTO.razonSocial,
                ruc: newClienteDTO.ruc,
                telefono: newClienteDTO.telefono,
            }
        });
        return ApiResponseDTO.success({
            data: ClienteDTOMapper.toDTO(result.data)
        })
    }

}
