import { Pedido } from "../model/pedido";

export abstract class PedidoRepository {
    abstract findById(id: number): Promise<Pedido | null>;
}
