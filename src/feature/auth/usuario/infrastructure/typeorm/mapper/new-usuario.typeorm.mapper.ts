import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { UsuarioTypeORMModel } from "../model/usuario.typeorm.model";

export class NewUsuarioTypeORMMapper {
    static toORM(newUsuario: NewUsuario): UsuarioTypeORMModel {
        const usuarioTypeOrm = new UsuarioTypeORMModel()
        if (newUsuario.id != null) usuarioTypeOrm.id = newUsuario.id
        usuarioTypeOrm.nombres = newUsuario.nombres
        usuarioTypeOrm.apellidos = newUsuario.apellidos
        usuarioTypeOrm.ci = newUsuario.ci
        usuarioTypeOrm.password = newUsuario.password
        usuarioTypeOrm.activo = newUsuario.activo
        return usuarioTypeOrm
    }

}