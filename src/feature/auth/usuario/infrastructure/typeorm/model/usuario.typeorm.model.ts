import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'auth', name: 'usuario' })
export class UsuarioTypeORMModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombres: string

    @Column()
    apellidos: string

    @Column()
    ci: string

    @Column()
    password: string

    @Column()
    activo: boolean

    @Column()
    eliminado: boolean
}