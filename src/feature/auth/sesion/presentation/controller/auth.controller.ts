import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { IniciarSesionUseCase } from "../../application/usecase/iniciar-sesion.usecase";
import { RefrescarSesionUseCase } from "../../application/usecase/refrescar-sesion.usecase";
import { LoginDTO } from "../dto/login.dto";
import { RefreshDTO } from "../dto/refresh.dto";
import { SesionDTO } from "../dto/sesion.dto";
import { SesionDTOMapper } from "../mapper/sesion-dto.mapper";

@Controller('auth')
export class AuthController {

    constructor(
        private iniciarSesionUseCase: IniciarSesionUseCase,
        private refrescarSesionUseCase: RefrescarSesionUseCase
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginDto: LoginDTO
    ): Promise<ApiResponseDTO<SesionDTO>> {
        const result = await this.iniciarSesionUseCase.execute({
            data: {
                ci: loginDto.ci,
                password: loginDto.password
            }
        });
        return ApiResponseDTO.success({
            data: SesionDTOMapper.toDTO(result.data)
        })
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
        @Body() refreshDto: RefreshDTO
    ): Promise<ApiResponseDTO<SesionDTO>> {
        const result = await this.refrescarSesionUseCase.execute({
            data: refreshDto.refreshToken
        });
        return ApiResponseDTO.success({
            data: SesionDTOMapper.toDTO(result.data)
        })
    }
}
