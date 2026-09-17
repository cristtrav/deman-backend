import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'facturacion', name: 'cliente'})
export class ClienteTypeORMModel {
     @PrimaryColumn({name: 'id'})
     id: number;

     @Column({name: 'razon_social', type: 'varchar', length: 100})
     razonSocial: string;

     @Column({name: 'eliminado', type: 'boolean', default: false})
     eliminado: boolean;
}