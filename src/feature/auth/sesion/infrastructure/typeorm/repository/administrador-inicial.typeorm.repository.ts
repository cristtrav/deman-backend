import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeORMTransactionContext } from "@core/infrastructure/typeorm/transaction/typeorm-transaction.context";
import { AdministradorInicialRepository } from "@feature/auth/sesion/application/repository/administrador-inicial.repository";
import { NewUsuario } from "@feature/auth/usuario/domain/model/new-usuario.entity";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { UsuarioTypeORMModel } from "@feature/auth/usuario/infrastructure/typeorm/model/usuario.typeorm.model";
import { NewUsuarioTypeORMMapper } from "@feature/auth/usuario/infrastructure/typeorm/mapper/new-usuario.typeorm.mapper";
import { UsuarioTypeORMMapper } from "@feature/auth/usuario/infrastructure/typeorm/mapper/usuario.typeorm.mapper";

export class AdministradorInicialTypeORMRepository implements AdministradorInicialRepository {
    constructor(
        @InjectRepository(UsuarioTypeORMModel)
        private usuarioTypeOrmRepository: Repository<UsuarioTypeORMModel>
    ) { }

    async bloquearUsuarios(): Promise<void> {
        // Fuera de una transacción el bloqueo se liberaría de inmediato
        const manager = TypeORMTransactionContext.manager
        if (!manager) throw new Error('El bloqueo de usuarios requiere una transacción')
        // Este modo es incompatible consigo mismo pero permite las lecturas
        await manager.query('LOCK TABLE auth.usuario IN SHARE ROW EXCLUSIVE MODE')
    }

    async existeUsuario(): Promise<boolean> {
        return TypeORMTransactionContext.repository(this.usuarioTypeOrmRepository).existsBy({ eliminado: false })
    }

    async crear(newUsuario: NewUsuario): Promise<Usuario> {
        const repository = TypeORMTransactionContext.repository(this.usuarioTypeOrmRepository)
        const guardado = await repository.save(NewUsuarioTypeORMMapper.toORM(newUsuario))
        return UsuarioTypeORMMapper.toDomain(await repository.findOneByOrFail({ id: guardado.id }))
    }
}
