import { CommandContract } from "@core/application/contract/command/command.contract";

interface ColorData{
    id: number, 
}

export class EliminarColorCommand implements CommandContract<ColorData>{
    userId?: number | undefined;
    data: ColorData;
}