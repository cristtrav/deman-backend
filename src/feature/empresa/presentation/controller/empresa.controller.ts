import { Body, Controller, Get, Put } from "@nestjs/common";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { Publico } from "@core/presentation/decorator/publico.decorator";
import { ConsultarEmpresaUseCase } from "@feature/empresa/application/usecase/consultar-empresa.usecase";
import { GuardarEmpresaUseCase } from "@feature/empresa/application/usecase/guardar-empresa.usecase";
import { EmpresaDTO } from "../dto/empresa.dto";
import { EmpresaNombreDTO } from "../dto/empresa-nombre.dto";
import { EmpresaDTOMapper } from "../mapper/empresa-dto.mapper";

// La empresa es un único registro: solo se consulta y se guarda (alta o modificación)
@Controller('empresa')
export class EmpresaController {
    constructor(
        private readonly consultarEmpresaUseCase: ConsultarEmpresaUseCase,
        private readonly guardarEmpresaUseCase: GuardarEmpresaUseCase
    ) {}

    @Get()
    async consultarEmpresa(): Promise<ApiResponseDTO<EmpresaDTO | null>> {
        const result = await this.consultarEmpresaUseCase.execute();
        return ApiResponseDTO.success({
            data: result.data ? EmpresaDTOMapper.toDTO(result.data) : null,
            message: result.data ? "Empresa consultada exitosamente" : "La empresa todavía no fue registrada"
        });
    }

    // Público: se muestra en la pantalla de login y en el título de la pestaña.
    // Expone solo el nombre; el resto de los datos requiere sesión.
    @Publico()
    @Get('nombre')
    async consultarNombre(): Promise<ApiResponseDTO<EmpresaNombreDTO>> {
        const result = await this.consultarEmpresaUseCase.execute();
        return ApiResponseDTO.success({
            data: { nombre: result.data?.nombre ?? null }
        });
    }

    @Put()
    async guardarEmpresa(@Body() empresaDto: EmpresaDTO): Promise<ApiResponseDTO<EmpresaDTO>> {
        const result = await this.guardarEmpresaUseCase.execute({
            data: EmpresaDTOMapper.toData(empresaDto)
        });
        return ApiResponseDTO.success({
            data: EmpresaDTOMapper.toDTO(result.data),
            message: "Datos de la empresa guardados"
        });
    }
}
