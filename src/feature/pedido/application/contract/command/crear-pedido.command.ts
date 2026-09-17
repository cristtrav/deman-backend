import { CommandContract } from "@core/application/contract/command/command.contract";
import { CrearPedidoData } from "../data/crear-pedido.data";

export class CrearPedidoCommand implements CommandContract<CrearPedidoData> {
    userId?: number | undefined;
    data: CrearPedidoData;
}