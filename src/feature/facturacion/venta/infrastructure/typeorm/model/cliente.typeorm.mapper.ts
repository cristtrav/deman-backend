import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'facturacion', name: 'cliente'})
export class ClienteTypeORMModel {
    @PrimaryColumn()
    id: number;

    @Column({name: 'razon_social', nullable: false, length: 100})
    razonSocial: string;
}