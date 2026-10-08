import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ClienteTypeORMModel } from "./cliente.typeorm.model";

@Entity({schema: 'pedidos', name: 'pedido'})
export class PedidoTypeORMModel {
    @PrimaryColumn({name: 'id'})
    id: number;

    @Column({
        name: 'total',
        type: 'numeric',
        transformer: { to: (value: number) => value, from: (value: string) => Number(value) }
    })
    total: number;

    @Column({
        name: 'saldo',
        type: 'numeric',
        precision: 9,
        scale: 0,
        transformer: { to: (value: number) => value, from: (value: string) => Number(value) }
    })
    saldo: number;

    @Column({name: 'eliminado', type: 'boolean', default: false})
    eliminado: boolean;

    @ManyToOne(() => ClienteTypeORMModel, {eager: true})
    @JoinColumn({name: 'id_cliente'})
    cliente: ClienteTypeORMModel;
}
