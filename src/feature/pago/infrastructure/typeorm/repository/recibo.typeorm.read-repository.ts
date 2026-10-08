import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReciboData } from "@feature/pago/application/contract/data/recibo.data";
import { ReciboReadRepository } from "@feature/pago/application/read-repository/recibo-read.repository";
import { ReciboTypeORMModel } from "../model/recibo.typeorm.model";
import { ReciboTypeORMMapper } from "../mapper/recibo.typeorm.mapper";

export class ReciboTypeORMReadRepository implements ReciboReadRepository {

    constructor(
        @InjectRepository(ReciboTypeORMModel)
        private readonly reciboRepository: Repository<ReciboTypeORMModel>
    ) { }

    async consultarPorNumero(numero: number): Promise<ReciboData | null> {
        const reciboOrm = await this.reciboRepository.findOne({ where: { numero } });
        return reciboOrm ? ReciboTypeORMMapper.toData(reciboOrm) : null;
    }
}
