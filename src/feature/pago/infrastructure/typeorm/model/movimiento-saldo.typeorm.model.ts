import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const numericTransformer = { to: (value: number) => value, from: (value: string) => Number(value) };

@Entity({schema: 'pagos-pedidos', name: 'movimiento_saldo'})
export class MovimientoSaldoTypeORMModel {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'id_pedido', type: 'integer'})
    pedidoId: number;

    @Column({name: 'id_recibo', type: 'integer'})
    reciboId: number;

    @Column({name: 'tipo', type: 'varchar', length: 10})
    tipo: string;

    @Column({name: 'fecha', type: 'timestamptz'})
    fecha: Date;

    @Column({name: 'monto', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    monto: number;

    @Column({name: 'saldo_anterior', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    saldoAnterior: number;

    @Column({name: 'saldo_posterior', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    saldoPosterior: number;
}
