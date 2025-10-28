import { NewCliente } from "@feature/facturacion/cliente/domain/model/new-cliente";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";

export class NewClienteTypeORMMapper {
    static toORM(newCliente: NewCliente): ClienteTypeORMModel {
        const clienteTypeOrm = new ClienteTypeORMModel()
        if (newCliente.id != null) clienteTypeOrm.id = newCliente.id;
        clienteTypeOrm.razonSocial = newCliente.razonSocial;
        clienteTypeOrm.ruc = newCliente.ruc;
        clienteTypeOrm.telefono = newCliente.telefono
        return clienteTypeOrm
    }
}