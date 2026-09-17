import { Cliente } from "../model/cliente";

export abstract class ClienteRepository {
    abstract findById(id: number): Promise<Cliente | null>;
    abstract findAll(): Promise<Cliente[]>;
}