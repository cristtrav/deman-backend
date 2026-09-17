import { Cliente } from "@feature/pedido/domain/model/cliente";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";

export class ClienteTypeORMMapper {
    static toDomain(clienteOrm: ClienteTypeORMModel): Cliente {
        return new Cliente(clienteOrm.id, clienteOrm.razonSocial);
    }

    static toORM(cliente: Cliente): ClienteTypeORMModel {
        const clienteOrm = new ClienteTypeORMModel();
        clienteOrm.id = cliente.id;
        clienteOrm.razonSocial = cliente.razonSocial;
        return clienteOrm;
    }

    static toData(clienteOrm: ClienteTypeORMModel): { id: number, razonSocial: string } {
        return {
            id: clienteOrm.id,
            razonSocial: clienteOrm.razonSocial
        }
    }
}