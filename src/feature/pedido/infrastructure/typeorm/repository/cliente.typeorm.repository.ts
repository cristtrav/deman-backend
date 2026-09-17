import { Cliente } from "@feature/pedido/domain/model/cliente";
import { ClienteRepository } from "@feature/pedido/domain/repository/cliente.repository";
import { ClienteTypeORMModel } from "../model/cliente.typeorm.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ClienteTypeORMMapper } from "../mapper/cliente.typeorm.mapper";

export class ClienteTypeORMRepository implements ClienteRepository {

    constructor(
        @InjectRepository(ClienteTypeORMModel)
        private readonly clienteTypeOrmRepository: Repository<ClienteTypeORMModel>
    ) { }

    async findById(id: number): Promise<Cliente | null> {
        let clienteOrm = await this.clienteTypeOrmRepository.findOne({ where: { id, eliminado: false } });
        return clienteOrm ? ClienteTypeORMMapper.toDomain(clienteOrm) : null;
    }
    async findAll(): Promise<Cliente[]> {
        let clientesOrm = await this.clienteTypeOrmRepository.find();
        return clientesOrm.map(clienteOrm => ClienteTypeORMMapper.toDomain(clienteOrm));
    }

}