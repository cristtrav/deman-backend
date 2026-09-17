import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Cliente {
    public readonly id: number;
    public razonSocial: string;

    public constructor(id: number, razonSocial: string){
        if(razonSocial == null) throw new RequiredFieldException("Cliente", "razonSocial");
        this.id = id;
        this.razonSocial = razonSocial;
    }

    public static reconstruir(id: number, razonSocial: string): Cliente {
        if(id == null) throw new RequiredFieldException("Cliente", "id");
        return new Cliente(id, razonSocial);
    }
}