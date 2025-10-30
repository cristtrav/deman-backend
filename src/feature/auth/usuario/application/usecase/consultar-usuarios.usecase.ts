import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Usuario } from "../../domain/model/usuario.entity";
import { UsuarioReadRepository } from "../read-repository/usuario.read-repository";

export class ConsultarUsuariosUseCase extends BaseUseCase<QueryContract, ResultContract<Usuario[]>>{
    constructor(private usuarioReadRepository : UsuarioReadRepository){super()}

    async execute(query:QueryContract): Promise<ResultContract<Usuario[]>>{
        return await this.usuarioReadRepository.findMany(query)
    }
}