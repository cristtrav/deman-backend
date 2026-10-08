import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'pagos-pedidos', name: 'numeracion'})
export class NumeracionTypeORMModel {
    @PrimaryColumn({name: 'codigo', type: 'varchar', length: 20})
    codigo: string;

    @Column({name: 'ultimo_numero', type: 'integer'})
    ultimoNumero: number;
}
