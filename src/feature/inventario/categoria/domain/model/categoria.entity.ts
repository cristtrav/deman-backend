import { CategoriaFieldValidationException } from "../exception/categoria-field-validation.exception";
import { CategoriaRequiredFieldException } from "../exception/categoria-required-field.exception";

export class Categoria {
    readonly id: number;
    readonly descripcion: string;

    constructor(id: number, descripcion: string){
        if(id == null) throw new CategoriaRequiredFieldException('id');
        if(descripcion == null) throw new CategoriaRequiredFieldException('descripcion');
        if(descripcion.length > 50) throw new CategoriaFieldValidationException('descripcion', 'Longitud máxima superada (50 carácteres)', descripcion);
        this.id = id;
        this.descripcion = descripcion;
    }
}