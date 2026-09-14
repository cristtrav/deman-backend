import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { NumeroFacturaFormatException } from "../exception/numero-factura-format.exception";

export class NumeroFactura {
    private _numero: string;

    constructor(numero: string){
        if(!numero) throw new RequiredFieldException('NumeroFactura', 'numero');
        const partesNro: string[] = numero.split('-');
        if(partesNro.length != 3) throw new NumeroFacturaFormatException();
        for(let parte of partesNro)
            if(Number.isNaN(Number(parte))) 
                throw new NumeroFacturaFormatException();

        this._numero = numero;
    }

    get numero(): string { return this._numero }

    public toString(){ return this._numero }

}