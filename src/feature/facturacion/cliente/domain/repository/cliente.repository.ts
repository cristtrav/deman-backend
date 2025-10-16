import { Cliente } from "../model/cliente";
import { NewCliente } from "../model/new-cliente";

export abstract class ClienteRepository {
    abstract create(newCliente: NewCliente): Promise<Cliente>
    abstract edit(previousId: number, cliente: Cliente): Promise<Cliente>
    abstract delete(id: number): Promise<void>
    abstract findById(id: number): Promise<Cliente | undefined>
}