import { UsuarioRepository } from "@feature/auth/usuario/domain/repository/usuario.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioTypeORMModel } from "../model/usuario.typeorm.model";
import { Repository } from "typeorm";
import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { NewUsuarioTypeORMMapper } from "../mapper/new-usuario.typeorm.mapper";
import { UsuarioTypeORMMapper } from "../mapper/usuario.typeorm.mapper";

export class UsuarioTypeORMRepository implements UsuarioRepository {
    constructor(
        @InjectRepository(UsuarioTypeORMModel)
        private usuarioTypeOrmRepository: Repository<UsuarioTypeORMModel>
    ) { }

    async editPassword(previousId: number, password: string): Promise<void> {
        const usuario = await this.usuarioTypeOrmRepository.findOneByOrFail({ id: previousId });
        usuario.password = password;
        await this.usuarioTypeOrmRepository.save(usuario);
        return
    }

    async create(newUsuario: NewUsuario): Promise<Usuario> {
        const usuarioTypeOrm = NewUsuarioTypeORMMapper.toORM(newUsuario);
        const savedUsuarioTypeOrm = await this.usuarioTypeOrmRepository.save(usuarioTypeOrm);
        return UsuarioTypeORMMapper.toDomain(await this.usuarioTypeOrmRepository.findOneByOrFail({ id: savedUsuarioTypeOrm.id }));
    }
    async edit(previousId: number, usuario: Usuario): Promise<Usuario> {
        const usuarioTypeOrm = UsuarioTypeORMMapper.toORM(usuario);
        const savedUsuarioTypeOrm = await this.usuarioTypeOrmRepository.save(usuarioTypeOrm);
        return UsuarioTypeORMMapper.toDomain(await this.usuarioTypeOrmRepository.findOneByOrFail({ id: savedUsuarioTypeOrm.id }));
    }
    async delete(id: number): Promise<void> {
        const usuarioTypeOrm = await this.usuarioTypeOrmRepository.findOneByOrFail({ id });
        usuarioTypeOrm.eliminado = true;
        await this.usuarioTypeOrmRepository.save(usuarioTypeOrm);
    }
    async findById(id: number): Promise<Usuario | undefined> {
        const usuarioTypeOrm = await this.usuarioTypeOrmRepository.findOneBy({ id });
        if (usuarioTypeOrm == null) return undefined;
        return UsuarioTypeORMMapper.toDomain(usuarioTypeOrm);
    }
}