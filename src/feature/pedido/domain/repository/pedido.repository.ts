import { NewPedido } from "../model/new-pedido";
import { Pedido } from "../model/pedido";

export abstract class PedidoRepository {
    abstract findById(id: number): Promise<Pedido | null>;    
    abstract create(pedido: NewPedido): Promise<Pedido>;
    abstract update(pedido: Pedido): Promise<Pedido>;
    abstract delete(id: number): Promise<void>;
}