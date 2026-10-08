import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({schema: 'configuracion', name: 'empresa'})
export class EmpresaTypeORMModel {
    // La tabla admite una única fila, siempre con id 1
    static readonly ID = 1;

    @PrimaryColumn({name: 'id', type: 'smallint'})
    id: number;

    @Column({name: 'nombre', type: 'varchar', length: 100})
    nombre: string;

    @Column({name: 'direccion', type: 'varchar', length: 200, nullable: true})
    direccion: string | null;

    @Column({name: 'ruc', type: 'varchar', length: 10, nullable: true})
    ruc: string | null;

    @Column({name: 'telefono', type: 'varchar', length: 20, nullable: true})
    telefono: string | null;
}
