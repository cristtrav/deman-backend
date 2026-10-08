import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { ReciboData } from "../contract/data/recibo.data";
import { ReciboReadRepository } from "../read-repository/recibo-read.repository";

export class ConsultarReciboUseCase extends BaseUseCase<number, ResultContract<ReciboData>> {

    constructor(
        private readonly reciboReadRepository: ReciboReadRepository
    ) { super(); }

    async execute(numero: number): Promise<ResultContract<ReciboData>> {
        const recibo = await this.reciboReadRepository.consultarPorNumero(numero);
        if(recibo == null) throw new NotFoundException('Recibo', numero);
        return { data: recibo };
    }
}
