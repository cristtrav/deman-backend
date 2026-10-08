import { ReciboData } from "@feature/pago/application/contract/data/recibo.data";
import { ReciboDTO } from "../dto/recibo.dto";

export class ReciboDTOMapper {
    static toDTO(recibo: ReciboData): ReciboDTO {
        const reciboDTO = new ReciboDTO();
        reciboDTO.numero = recibo.numero;
        reciboDTO.pagoId = recibo.pagoId;
        reciboDTO.pedidoId = recibo.pedidoId;
        reciboDTO.fechaEmision = recibo.fechaEmision;
        reciboDTO.fechaPago = recibo.fechaPago;
        reciboDTO.monto = recibo.monto;
        reciboDTO.totalPedido = recibo.totalPedido;
        reciboDTO.saldoAnterior = recibo.saldoAnterior;
        reciboDTO.saldoPosterior = recibo.saldoPosterior;
        reciboDTO.cliente = { ...recibo.cliente };
        reciboDTO.empresa = recibo.empresa ? { ...recibo.empresa } : undefined;
        reciboDTO.anulacion = recibo.anulacion ? { ...recibo.anulacion } : undefined;
        reciboDTO.generadoPorMigracion = recibo.generadoPorMigracion;
        return reciboDTO;
    }
}
