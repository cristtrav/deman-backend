import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CredencialReadRepository } from "@feature/auth/sesion/application/read-repository/credencial.read-repository";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { UsuarioTypeORMModel } from "@feature/auth/usuario/infrastructure/typeorm/model/usuario.typeorm.model";
import { UsuarioTypeORMMapper } from "@feature/auth/usuario/infrastructure/typeorm/mapper/usuario.typeorm.mapper";

export class CredencialReadTypeORMRepository implements CredencialReadRepository {
    constructor(
        @InjectRepository(UsuarioTypeORMModel)
        private usuarioReadRepository: Repository<UsuarioTypeORMModel>
    ) { }

    async findByCi(ci: string): Promise<Usuario | undefined> {
        const usuarioTypeOrm = await this.usuarioReadRepository.findOneBy({ ci, eliminado: false });
        if (usuarioTypeOrm == null) return undefined;
        return UsuarioTypeORMMapper.toDomain(usuarioTypeOrm);
    }

    async findById(id: number): Promise<Usuario | undefined> {
        const usuarioTypeOrm = await this.usuarioReadRepository.findOneBy({ id, eliminado: false });
        if (usuarioTypeOrm == null) return undefined;
        return UsuarioTypeORMMapper.toDomain(usuarioTypeOrm);
    }
}
