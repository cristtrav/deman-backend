import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * Vista parcial del recibo con solo la copia de los datos de la empresa.
 */
@Entity({schema: 'pagos-pedidos', name: 'recibo'})
export class ReciboEmpresaTypeORMModel {
    @PrimaryColumn({name: 'id'})
    id: number;

    @Column({name: 'empresa_nombre', type: 'varchar', length: 100, nullable: true})
    empresaNombre: string | null;

    @Column({name: 'empresa_direccion', type: 'varchar', length: 200, nullable: true})
    empresaDireccion: string | null;

    @Column({name: 'empresa_ruc', type: 'varchar', length: 10, nullable: true})
    empresaRuc: string | null;

    @Column({name: 'empresa_telefono', type: 'varchar', length: 20, nullable: true})
    empresaTelefono: string | null;
}
