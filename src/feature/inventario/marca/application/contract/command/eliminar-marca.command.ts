import { CommandContract } from "@core/application/contract/command/command.contract";

interface MarcaData{
    id: number;
}

export class EliminarMarcaCommand implements CommandContract<MarcaData>{
    userId?: number | undefined;
    data: MarcaData;
}