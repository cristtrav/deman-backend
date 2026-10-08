import { PagoData } from "@feature/pago/application/contract/data/pago.data";
import { CrearPagoData } from "@feature/pago/application/contract/data/crear-pago.data";
import { PagoDTO } from "../dto/pago.dto";
import { NewPagoDTO } from "../dto/new-pago.dto";

export class PagoDTOMapper {
    static toDTO(pago: PagoData): PagoDTO {
        const pagoDTO = new PagoDTO();
        pagoDTO.id = pago.id;
        pagoDTO.pedidoId = pago.pedidoId;
        pagoDTO.fecha = pago.fecha;
        pagoDTO.monto = pago.monto;
        pagoDTO.numeroRecibo = pago.numeroRecibo;
        return pagoDTO;
    }

    static toCrearData(dto: NewPagoDTO): CrearPagoData {
        return {
            pedidoId: dto.pedidoId,
            fecha: dto.fecha,
            monto: dto.monto
        };
    }
}
