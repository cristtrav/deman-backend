import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiResponseDTO } from "@core/presentation/dto/response/api-response.dto";
import { ConsultarReciboUseCase } from "@feature/pago/application/usecase/consultar-recibo.usecase";
import { ReciboDTO } from "../dto/recibo.dto";
import { ReciboDTOMapper } from "../mapper/recibo-dto.mapper";

@Controller('recibos')
export class ReciboController {
    constructor(
        private readonly consultarReciboUseCase: ConsultarReciboUseCase
    ) {}

    @Get(':numero')
    async consultarRecibo(
        @Param('numero', ParseIntPipe) numero: number
    ): Promise<ApiResponseDTO<ReciboDTO>> {
        const result = await this.consultarReciboUseCase.execute(numero);
        return ApiResponseDTO.success({
            data: ReciboDTOMapper.toDTO(result.data),
            message: "Recibo consultado exitosamente"
        });
    }
}
