import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoTypeORMModel } from "./pedido.typeorm.model";

@Entity({schema: 'pagos-pedidos', name: 'pago'})
export class PagoTypeORMModel {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'fecha', type: 'date'})
    fecha: string;

    @Column({
        name: 'monto',
        type: 'numeric',
        precision: 9,
        scale: 0,
        transformer: { to: (value: number) => value, from: (value: string) => Number(value) }
    })
    monto: number;

    @Column({name: 'eliminado', type: 'boolean', default: false})
    eliminado: boolean;

    @ManyToOne(() => PedidoTypeORMModel, {eager: true})
    @JoinColumn({name: 'id_pedido'})
    pedido: PedidoTypeORMModel;
}
