import { Pedido } from "../model/pedido";

export abstract class PedidoRepository {
    abstract findById(id: number): Promise<Pedido | null>;
    /**
     * Igual que findById, pero bloquea el pedido hasta el fin de la transacción en curso
     * para que las operaciones sobre su saldo no se ejecuten en paralelo.
     */
    abstract findByIdForUpdate(id: number): Promise<Pedido | null>;
    abstract actualizarSaldo(pedido: Pedido): Promise<void>;
}
