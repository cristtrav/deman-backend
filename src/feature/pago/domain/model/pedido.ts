import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Pedido {
    public readonly id: number;

    public constructor(id: number){
        if(id == null) throw new RequiredFieldException("Pedido", "id");
        this.id = id;
    }
}
