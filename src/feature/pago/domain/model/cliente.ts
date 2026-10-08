import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Cliente {
    public readonly id: number;
    public readonly razonSocial: string;
    public readonly ruc?: string;

    public constructor(id: number, razonSocial: string, ruc?: string | null){
        if(id == null) throw new RequiredFieldException("Cliente", "id");
        if(razonSocial == null) throw new RequiredFieldException("Cliente", "razonSocial");
        this.id = id;
        this.razonSocial = razonSocial;
        this.ruc = ruc ?? undefined;
    }
}
