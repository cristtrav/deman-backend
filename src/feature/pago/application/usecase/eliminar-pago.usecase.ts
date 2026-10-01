import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { EliminarPagoCommand } from "../contract/command/eliminar-pago.command";

export class EliminarPagoUseCase extends BaseUseCase<EliminarPagoCommand, void> {

    constructor(
        private readonly pagoRepository: PagoRepository
    ){ super(); }

    async execute(command: EliminarPagoCommand): Promise<void> {
        const pago = await this.pagoRepository.findById(command.data.id);
        if(pago == null) throw new NotFoundException('Pago', command.data.id);
        await this.pagoRepository.delete(command.data.id);
    }
}
