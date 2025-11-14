import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { EliminarUsuarioUseCase } from "../../application/usecase/eliminar-usuario.usecase";
import { EditarUsuarioUseCase } from "../../application/usecase/editar-usuario.usecase";
import { CrearUsuarioUseCase } from "../../application/usecase/crear-usuario.usecase";
import { ConsultarUsuariosUseCase } from "../../application/usecase/consultar-usuarios.usecase";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { UsuarioDTO } from "../dto/usuario.dto";
import { UsuarioDTOMapper } from "../mapper/usuario-dto.mapper";
import { GetQueryParamsDTO } from "@core/presentation/dto/request/get-query-params.dto";
import { GetQueryParamsMapper } from "@core/presentation/mapper/get-query-params.mapper";
import { PaginationApiMapper } from "@core/presentation/mapper/pagination-api.mapper";
import { NewUsuarioDTO } from "../dto/new-usuario.dto";
import { EditarPasswordUseCase } from "../../application/usecase/editar-password.usecase";

@Controller('usuarios')
export class UsuarioController {

    constructor(
        private eliminarUsuarioUseCase: EliminarUsuarioUseCase,
        private editarUsuarioUseCase: EditarUsuarioUseCase,
        private crearUsuarioUseCase: CrearUsuarioUseCase,
        private consultarUsuariosUseCase: ConsultarUsuariosUseCase,
        private editarPasswordUseCase: EditarPasswordUseCase
    ) { }

    @Delete(":id")
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ApiResponseDTO<void>> {
        await this.eliminarUsuarioUseCase.execute({ data: { id } });
        return ApiResponseDTO.success();
    }

    @Put(":previousId")
    async put(
        @Param("previousId", ParseIntPipe) previousId: number,
        @Body() usuarioDto: UsuarioDTO
    ): Promise<ApiResponseDTO<UsuarioDTO>> {
        const result = await this.editarUsuarioUseCase.execute({
            previousId: previousId,
            data: {
                id: usuarioDto.id,
                nombres: usuarioDto.nombres,
                apellidos: usuarioDto.apellidos,
                ci: usuarioDto.ci,
                password: usuarioDto.password,
                activo: usuarioDto.activo,
            }
        })
        return ApiResponseDTO.success({
            data: UsuarioDTOMapper.toDTO(result.data)
        })
    }
    @Put(':previousId/password')
    async putPassword(
        @Param('previousId', ParseIntPipe) previousId: number,
        @Body('password') password: string
    ): Promise<ApiResponseDTO<void>> {
        await this.editarPasswordUseCase.execute({
            previousId,
            data: password 
        });
        return ApiResponseDTO.success();
    }

    @Get()
    async get(
        @Query() queryParams: GetQueryParamsDTO
    ): Promise<ApiResponseDTO<UsuarioDTO[]>> {
        const result = await this.consultarUsuariosUseCase.execute(
            GetQueryParamsMapper.toQueryContract(queryParams)
        );

        return ApiResponseDTO.success({
            data: result.data.map(u => UsuarioDTOMapper.toDTO(u)),
            pagination: result.page ? PaginationApiMapper.toApiResponsePaginationDTO(result.page) : undefined
        })
    }

    @Post()
    async post(
        @Body() newUsuarioDTO: NewUsuarioDTO
    ): Promise<ApiResponseDTO<UsuarioDTO>> {
        const result = await this.crearUsuarioUseCase.execute({
            data: {
                id: newUsuarioDTO.id,
                nombres: newUsuarioDTO.nombres,
                apellidos: newUsuarioDTO.apellidos,
                ci: newUsuarioDTO.ci,
                password: newUsuarioDTO.password,
                activo: newUsuarioDTO.activo,
            }
        });
        return ApiResponseDTO.success({
            data: UsuarioDTOMapper.toDTO(result.data)
        })
    }

}
