import { CommandContract } from "@core/application/contract/command/command.contract";

interface CategoriaData {
    id: number;
}

export class EliminarCategoriaCommand implements CommandContract<CategoriaData>{
    userId?: number | undefined;
    data: CategoriaData;
}