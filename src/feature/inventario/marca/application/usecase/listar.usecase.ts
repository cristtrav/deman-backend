import { Marca } from "../../domain/model/marca.entity";
import { MarcaRepository } from "../../domain/repository/marca.repository";

export class ListarMarcasUseCase {

    constructor(
        private marcaRepository: MarcaRepository
    ) { }

    public async execute(): Promise<Marca[]> {
        const listaMarcas = await this.marcaRepository.listar();
        return listaMarcas;
    }
}