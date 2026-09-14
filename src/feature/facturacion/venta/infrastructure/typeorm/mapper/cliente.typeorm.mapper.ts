import { Cliente } from "@feature/facturacion/venta/domain/model/cliente";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.mapper";

export class ClienteTypeORMMapper {
    static toDomain(clienteOrm: ClienteTypeORMModel): Cliente {
        return new Cliente(clienteOrm.id, clienteOrm.razonSocial);
    }
}