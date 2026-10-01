import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'pedidos', name: 'pedido'})
export class PedidoTypeORMModel {
    @PrimaryColumn({name: 'id'})
    id: number;

    @Column({name: 'eliminado', type: 'boolean', default: false})
    eliminado: boolean;
}
