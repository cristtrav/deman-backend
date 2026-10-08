import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { BusinessRuleException } from "@core/domain/exception/business-rule.exception";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { PagoRepository } from "@feature/pago/domain/repository/pago.repository";
import { PedidoRepository } from "@feature/pago/domain/repository/pedido.repository";
import { ReciboRepository } from "@feature/pago/domain/repository/recibo.repository";
import { MovimientoSaldoRepository } from "@feature/pago/domain/repository/movimiento-saldo.repository";
import { NumeracionReciboRepository } from "@feature/pago/domain/repository/numeracion-recibo.repository";
import { EmpresaRepository } from "@feature/pago/domain/repository/empresa.repository";
import { NewPago } from "@feature/pago/domain/model/new-pago";
import { NewRecibo } from "@feature/pago/domain/model/new-recibo";
import { NewMovimientoSaldo } from "@feature/pago/domain/model/new-movimiento-saldo";
import { Temporal } from "@js-temporal/polyfill";
import { CrearPagoCommand } from "../contract/command/crear-pago.command";
import { PagoData } from "../contract/data/pago.data";
import { PagoDataMapper } from "../mapper/pago-data.mapper";
import { SaldoPedidoService } from "../service/saldo-pedido.service";

/**
 * Registra un pago y emite su recibo en la misma transacción.
 * Sin los datos de la empresa no se registra el pago, porque su recibo no podría emitirse.
 */
export class CrearPagoUseCase extends BaseUseCase<CrearPagoCommand, ResultContract<PagoData>> {
    private readonly saldoPedidoService: SaldoPedidoService;

    constructor(
        private readonly transactionManager: TransactionManager,
        private readonly pagoRepository: PagoRepository,
        private readonly pedidoRepository: PedidoRepository,
        private readonly reciboRepository: ReciboRepository,
        private readonly movimientoSaldoRepository: MovimientoSaldoRepository,
        private readonly numeracionReciboRepository: NumeracionReciboRepository,
        private readonly empresaRepository: EmpresaRepository
    ) {
        super();
        this.saldoPedidoService = new SaldoPedidoService(pagoRepository, pedidoRepository);
    }

    async execute(command: CrearPagoCommand): Promise<ResultContract<PagoData>> {
        return this.transactionManager.run(async () => {
            const empresa = await this.empresaRepository.obtener();
            if(empresa == null)
                throw new BusinessRuleException("Debe registrar los datos de la empresa antes de emitir recibos");

            const pedido = await this.pedidoRepository.findByIdForUpdate(command.data.pedidoId);
            if(pedido == null) throw new NotFoundException('Pedido', command.data.pedidoId);

            const saldoAnterior = await this.saldoPedidoService.calcular(pedido);
            const pago = await this.pagoRepository.create(new NewPago(
                pedido,
                Temporal.PlainDate.from(command.data.fecha),
                command.data.monto
            ));
            const saldoPosterior = await this.saldoPedidoService.recalcular(pedido);

            const numero = await this.numeracionReciboRepository.siguiente();
            const recibo = await this.reciboRepository.create(
                NewRecibo.emitir(numero, pago, saldoAnterior, saldoPosterior, Temporal.Now.instant(), empresa)
            );
            await this.movimientoSaldoRepository.create(NewMovimientoSaldo.emision(recibo));

            return { data: PagoDataMapper.toData(pago, recibo) };
        });
    }
}
