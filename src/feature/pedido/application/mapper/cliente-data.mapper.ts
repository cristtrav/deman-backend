import { Cliente } from "@feature/pedido/domain/model/cliente";
import { ClienteData } from "../contract/data/cliente.data";

export class ClienteDataMapper {
    static toData(cliente: Cliente): ClienteData {
        return {
            id: cliente.id,
            razonSocial: cliente.razonSocial
        };
    }
}