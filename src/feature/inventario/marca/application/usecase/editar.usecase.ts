import { NotFoundException } from "@core/application/exception/not-found.exception";
import { Marca } from "../../domain/model/marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { EditarMarcaCommand } from "../../contract/command/editar-marca.command";
import { ResultContract } from "@core/application/contract/result/result.contract";

export class EditarMarcaUseCase extends BaseUseCase<EditarMarcaCommand, ResultContract<Marca>> {
    constructor(
        private readonly marcaRepository: MarcaRepository
    ) { super(); }

    async execute(command: EditarMarcaCommand): Promise<ResultContract<Marca>> {
        const marcaActual = await this.marcaRepository.findById(command.data.id);
        if (!marcaActual) throw new NotFoundException("Marca", command.data.id);

        const marcaEditada = new Marca(command.data.id, command.data.descripcion);
        return { data: await this.marcaRepository.edit(marcaEditada)}
    }
}
