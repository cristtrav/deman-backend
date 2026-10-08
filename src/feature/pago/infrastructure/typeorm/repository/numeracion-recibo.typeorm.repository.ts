import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { NumeracionReciboRepository } from "@feature/pago/domain/repository/numeracion-recibo.repository";
import { NumeracionTypeORMModel } from "../model/numeracion.typeorm.model";

export class NumeracionReciboTypeORMRepository implements NumeracionReciboRepository {
    private static readonly CODIGO = 'RECIBO';

    constructor(
        @InjectRepository(NumeracionTypeORMModel)
        private readonly numeracionTypeOrmRepository: Repository<NumeracionTypeORMModel>
    ) { }

    async siguiente(): Promise<number> {
        // Fuera de una transacción el número se confirmaría aunque la emisión fallara después.
        if(!TypeORMTransactionContext.manager) throw new Error("La numeración de recibos requiere una transacción");

        // El UPDATE bloquea la fila hasta el commit: las emisiones concurrentes esperan su turno.
        const result = await TypeORMTransactionContext.repository(this.numeracionTypeOrmRepository)
            .createQueryBuilder()
            .update(NumeracionTypeORMModel)
            .set({ ultimoNumero: () => 'ultimo_numero + 1' })
            .where('codigo = :codigo', { codigo: NumeracionReciboTypeORMRepository.CODIGO })
            .returning('ultimo_numero')
            .execute();

        const numero = result.raw[0]?.ultimo_numero;
        if(numero == null) throw new Error(`No existe la numeración «${NumeracionReciboTypeORMRepository.CODIGO}»`);
        return Number(numero);
    }
}
