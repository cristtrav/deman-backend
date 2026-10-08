import { Cliente } from "@feature/pago/domain/model/cliente";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";

export class ClienteTypeORMMapper {
    static toDomain(clienteOrm: ClienteTypeORMModel): Cliente {
        return new Cliente(clienteOrm.id, clienteOrm.razonSocial, clienteOrm.ruc);
    }

    static toORM(cliente: Cliente): ClienteTypeORMModel {
        const clienteOrm = new ClienteTypeORMModel();
        clienteOrm.id = cliente.id;
        clienteOrm.razonSocial = cliente.razonSocial;
        clienteOrm.ruc = cliente.ruc ?? null;
        return clienteOrm;
    }
}
