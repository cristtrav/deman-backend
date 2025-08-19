import { CommandContract } from "@core/application/contract/command/command.contract"

interface MarcaData {
    id: number,
    descripcion: string
}

export class EditarMarcaCommand implements CommandContract<MarcaData> {
    userId?: number | undefined
    data: MarcaData

}