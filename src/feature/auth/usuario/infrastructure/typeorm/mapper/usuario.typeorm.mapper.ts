import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { UsuarioTypeORMModel } from "../model/usuario.typeorm.model";

export class UsuarioTypeORMMapper {
    static toDomain(usuarioTypeORM: UsuarioTypeORMModel): Usuario {
        return new Usuario(
            usuarioTypeORM.id,
            usuarioTypeORM.nombres,
            usuarioTypeORM.apellidos,
            usuarioTypeORM.ci,
            usuarioTypeORM.password,
            usuarioTypeORM.activo
        )
    }

    static toORM(usuario: Usuario): UsuarioTypeORMModel {
        const usuarioTypeOrm = new UsuarioTypeORMModel()
        usuarioTypeOrm.id = usuario.id
        usuarioTypeOrm.nombres = usuario.nombres
        usuarioTypeOrm.apellidos = usuario.apellidos
        usuarioTypeOrm.ci = usuario.ci
        usuarioTypeOrm.password = usuario.password
        usuarioTypeOrm.activo = usuario.activo
        return usuarioTypeOrm
    }
}