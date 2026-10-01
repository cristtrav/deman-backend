import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewPago } from "@feature/pago/domain/model/new-pago";
import { Pago } from "@feature/pago/domain/model/pago";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PagoTypeORMModel } from "../model/pago.typeorm.model";
import { PagoTypeORMMapper } from "../mapper/pago.typeorm.mapper";

export class PagoTypeORMRepository implements PagoRepository {
    constructor(
        @InjectRepository(PagoTypeORMModel)
        private readonly pagoTypeOrmRepository: Repository<PagoTypeORMModel>
    ){}

    async findById(id: number): Promise<Pago | null> {
        const pagoOrm = await this.pagoTypeOrmRepository.findOne({where: { id, eliminado: false }});
        return pagoOrm ? PagoTypeORMMapper.toDomain(pagoOrm) : null;
    }

    async create(pago: NewPago): Promise<Pago> {
        const savedPago = await this.pagoTypeOrmRepository.save(PagoTypeORMMapper.toORM(pago));
        return PagoTypeORMMapper.toDomain(savedPago);
    }

    async update(pago: Pago): Promise<Pago> {
        const savedPago = await this.pagoTypeOrmRepository.save(PagoTypeORMMapper.toORM(pago));
        return PagoTypeORMMapper.toDomain(savedPago);
    }

    async delete(id: number): Promise<void> {
        const pagoOrm = await this.pagoTypeOrmRepository.findOne({where: { id }});
        if(!pagoOrm) throw new Error("Pago no encontrado");
        pagoOrm.eliminado = true;
        await this.pagoTypeOrmRepository.save(pagoOrm);
    }
}
