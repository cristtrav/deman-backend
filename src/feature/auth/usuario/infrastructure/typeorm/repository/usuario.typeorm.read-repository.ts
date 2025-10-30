import { UsuarioReadRepository } from "@feature/auth/usuario/application/read-repository/usuario.read-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioTypeORMModel } from "../model/usuario.typeorm.model";
import { Repository } from "typeorm";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Usuario } from "@feature/auth/usuario/domain/model/usuario.entity";
import { UsuarioTypeORMMapper } from "../mapper/usuario.typeorm.mapper";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import PRODUCTO_FIELD_MAP from "../mapping/usuario.typeorm.mapping";

export class UsuarioReadTypeORMRepository implements UsuarioReadRepository {
    constructor(
        @InjectRepository(UsuarioTypeORMModel)
        private usuarioReadRepository: Repository<UsuarioTypeORMModel>
    ) { }
    async findById(id: number): Promise<Usuario | undefined> {
        const usuarioReadTypeOrm = await this.usuarioReadRepository.findOneBy({ id });
        if (usuarioReadTypeOrm == null) return undefined;
        return UsuarioTypeORMMapper.toDomain(usuarioReadTypeOrm);
    }
    async findMany(query: QueryContract): Promise<ResultContract<Usuario[]>> {
        const options = QueryFindOptionsMapper.toFindOptions(query, PRODUCTO_FIELD_MAP);
        options.where = { ...options.where, eliminado: false }
        const usuariosRead = await this.usuarioReadRepository.find(options);
        const result: ResultContract<Usuario[]> = { data: usuariosRead.map(p => UsuarioTypeORMMapper.toDomain(p)) }
        if (query.pagination) result.page = {
            page: query.pagination.page,
            pageSize: query.pagination.pageSize,
            total: await this.usuarioReadRepository.count(options)
        }
        return result;
    }
}