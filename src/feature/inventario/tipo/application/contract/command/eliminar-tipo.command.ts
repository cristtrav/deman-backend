import { CommandContract } from "@core/application/contract/command/command.contract";

interface TipoData{
    id: number, 
}

export class EliminarTipoCommand implements CommandContract<TipoData>{
    userId?: number | undefined;
    data: TipoData;
}