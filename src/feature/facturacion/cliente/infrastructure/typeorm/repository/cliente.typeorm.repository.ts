import { ClienteRepository } from "@feature/facturacion/cliente/domain/repository/cliente.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";
import { Repository } from "typeorm";
import { Cliente } from "@feature/facturacion/cliente/domain/model/cliente";
import { NewCliente } from "@feature/facturacion/cliente/domain/model/new-cliente";
import { NewClienteTypeORMMapper } from "../mapper/new-cliente.typeorm.mapper";
import { ClienteTypeORMMapper } from "../mapper/cliente.typeom.mapper";

export class ClienteTypeORMRepository implements ClienteRepository {
    constructor(
        @InjectRepository(ClienteTypeORMModel)
        private clienteTypeOrmRepository: Repository<ClienteTypeORMModel>
    ) { }
    async create(newCliente: NewCliente): Promise<Cliente> {
        const clienteTypeOrm = NewClienteTypeORMMapper.toORM(newCliente);
        const savedClienteTypeOrm = await this.clienteTypeOrmRepository.save(clienteTypeOrm);
        return ClienteTypeORMMapper.toDomain(await this.clienteTypeOrmRepository.findOneByOrFail({ id: savedClienteTypeOrm.id }));
    }
    async edit(previousId: number, cliente: Cliente): Promise<Cliente> {
        const clienteTypeOrm = ClienteTypeORMMapper.toORM(cliente);
        const savedClienteTypeOrm = await this.clienteTypeOrmRepository.save(clienteTypeOrm);
        if (previousId != clienteTypeOrm.id) await this.clienteTypeOrmRepository.delete(previousId);
        return ClienteTypeORMMapper.toDomain(await this.clienteTypeOrmRepository.findOneByOrFail({ id: savedClienteTypeOrm.id }));
    }
    async delete(id: number): Promise<void> {
        const clienteTypeOrm = await this.clienteTypeOrmRepository.findOneByOrFail({ id });
        clienteTypeOrm.eliminado = true;
        await this.clienteTypeOrmRepository.save(clienteTypeOrm);
    }
    async findById(id: number): Promise<Cliente | undefined> {
        const clienteTypeOrm = await this.clienteTypeOrmRepository.findOneBy({ id });
        if (clienteTypeOrm == null) return undefined;
        return ClienteTypeORMMapper.toDomain(clienteTypeOrm);
    }

}