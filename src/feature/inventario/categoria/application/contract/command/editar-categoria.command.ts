import { CommandContract } from "@core/application/contract/command/command.contract";

interface CategoriaData {
    id: number
    descripcion: string
}

export class EditarCategoriaCommand implements CommandContract<CategoriaData> {
    userId?: number | undefined;
    data: CategoriaData;
}