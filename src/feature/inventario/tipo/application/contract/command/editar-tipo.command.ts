import { CommandContract } from "@core/application/contract/command/command.contract";

interface TipoData{
    id: number, 
    descripcion: string
}

export class EditarTipoCommand implements CommandContract<TipoData>{
    userId?: number | undefined;
    data: TipoData;
}