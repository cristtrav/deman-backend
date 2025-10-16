import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'facturacion', name: 'cliente'})
export class ClienteTypeORMModel {
    @PrimaryGeneratedColumn('identity', {generatedIdentity: 'BY DEFAULT'})
    id: number; 

    @Column({name: 'razon_social'})
    razonSocial: string

    @Column()
    ruc: string

    @Column()
    telefono: string

    @Column()
    eliminado: boolean
}