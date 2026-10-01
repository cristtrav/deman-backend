import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClienteTypeORMModel } from "./cliente.typeorm.model";

@Entity({schema: 'pedidos',name: 'pedido'})
export class PedidoTypeORMModel {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'fecha_pedido', type: 'date'})
    fechaPedido: string;

    @Column({name: 'fecha_confirmacion', type: 'date'})
    fechaConfirmacion: string;

    @Column({name: 'fecha_entrega', type: 'date'})
    fechaEntrega: string;

    @Column({name: 'fecha_entregado', type: 'date', nullable: true})
    fechaEntregado: string | null;

    @Column({name: 'confirmado', type: 'boolean'})
    confirmado: boolean;

    @Column({name: 'entregado', type: 'boolean'})
    entregado: boolean;

    @Column({name: 'total', type: 'numeric', precision: 10, scale: 2})
    total: number;

    @Column({
        name: 'saldo',
        type: 'numeric',
        precision: 9,
        scale: 0,
        transformer: { to: (value: number) => value, from: (value: string) => Number(value) }
    })
    saldo: number;

    @Column({name: 'descripcion', type: 'text'})
    descripcion: string;

    @Column({name: 'eliminado', type: 'boolean', default: false})
    eliminado: boolean;

    @ManyToOne(() => ClienteTypeORMModel, {eager: true})
    @JoinColumn({name: 'id_cliente'})
    cliente: ClienteTypeORMModel;
}