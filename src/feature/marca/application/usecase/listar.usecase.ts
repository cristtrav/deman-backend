import { Marca } from "@feature/marca/domain/model/marca.entity";
import { MarcaRepository } from "@feature/marca/domain/repository/marca.repository";

export class ListarMarcasUseCase {

    constructor(
        private marcaRepository: MarcaRepository
    ) { }

    public async execute(): Promise<Marca[]> {
        console.log("caso de uso")
        const listaMarcas = await this.marcaRepository.listar();
        console.log(listaMarcas)
        return listaMarcas;
    }
}