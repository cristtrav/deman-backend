import { CommandContract } from "@core/application/contract/command/command.contract";

interface ColorData {
    id?: number, 
    descripcion: string
}

export class CrearColorCommand implements CommandContract<ColorData>{
    userId?: number | undefined;
    data: ColorData;
}