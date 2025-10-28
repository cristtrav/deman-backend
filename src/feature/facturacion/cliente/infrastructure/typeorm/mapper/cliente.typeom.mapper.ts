import { Cliente } from "@feature/facturacion/cliente/domain/model/cliente"
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model"

export class ClienteTypeORMMapper {
    static toDomain(clienteTypeOrm: ClienteTypeORMModel): Cliente {
        return new Cliente(
            clienteTypeOrm.id,
            clienteTypeOrm.razonSocial,
            clienteTypeOrm.ruc,
            clienteTypeOrm.telefono
        )
    }

    static toORM(cliente: Cliente): ClienteTypeORMModel {
        const clienteTypeOrm = new ClienteTypeORMModel()
        clienteTypeOrm.id = cliente.id;
        clienteTypeOrm.razonSocial = cliente.razonSocial;
        clienteTypeOrm.ruc = cliente.ruc;
        clienteTypeOrm.telefono = cliente.telefono
        return clienteTypeOrm
    }
}