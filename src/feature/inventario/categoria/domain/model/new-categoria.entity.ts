import { CategoriaFieldValidationException } from "../exception/categoria-field-validation.exception";
import { CategoriaRequiredFieldException } from "../exception/categoria-required-field.exception";

export class NewCategoria{
    readonly id?: number;
    readonly descripcion: string;

    constructor(descripcion: string, id?: number){
        if(descripcion == null) throw new CategoriaRequiredFieldException('descripcion');
        if(descripcion.length > 50) throw new CategoriaFieldValidationException('descripcion', 'Longitud máxima superada (50 carácteres)', descripcion);
        this.id = id;
        this.descripcion = descripcion;
    }
}