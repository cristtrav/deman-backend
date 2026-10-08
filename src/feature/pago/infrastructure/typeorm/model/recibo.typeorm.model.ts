import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const numericTransformer = { to: (value: number) => value, from: (value: string) => Number(value) };

@Entity({schema: 'pagos-pedidos', name: 'recibo'})
export class ReciboTypeORMModel {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'numero', type: 'integer'})
    numero: number;

    @Column({name: 'id_pago', type: 'integer'})
    pagoId: number;

    @Column({name: 'id_pedido', type: 'integer'})
    pedidoId: number;

    @Column({name: 'fecha_emision', type: 'timestamptz'})
    fechaEmision: Date;

    @Column({name: 'fecha_pago', type: 'date'})
    fechaPago: string;

    @Column({name: 'monto', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    monto: number;

    @Column({name: 'total_pedido', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    totalPedido: number;

    @Column({name: 'saldo_anterior', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    saldoAnterior: number;

    @Column({name: 'saldo_posterior', type: 'numeric', precision: 9, scale: 0, transformer: numericTransformer})
    saldoPosterior: number;

    @Column({name: 'cliente_razon_social', type: 'varchar', length: 100})
    clienteRazonSocial: string;

    @Column({name: 'cliente_ruc', type: 'varchar', length: 10, nullable: true})
    clienteRuc: string | null;

    @Column({name: 'generado_por_migracion', type: 'boolean', default: false})
    generadoPorMigracion: boolean;

    @Column({name: 'anulado', type: 'boolean', default: false})
    anulado: boolean;

    @Column({name: 'fecha_anulacion', type: 'timestamptz', nullable: true})
    fechaAnulacion: Date | null;

    @Column({name: 'motivo_anulacion', type: 'text', nullable: true})
    motivoAnulacion: string | null;
}
