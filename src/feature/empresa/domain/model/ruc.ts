import { FieldValidationException } from "@core/domain/exception/field-validation.exception";

/**
 * RUC paraguayo: número base de hasta 8 dígitos, guion y dígito verificador («1234567-9»).
 */
export class Ruc {
    private static readonly FORMATO = /^(\d{1,8})-(\d)$/;
    public readonly valor: string;

    constructor(valor: string, recurso: string = "RUC"){
        const limpio = valor?.trim() ?? '';
        const partes = Ruc.FORMATO.exec(limpio);
        if(partes == null)
            throw new FieldValidationException(recurso, "ruc", "debe tener el formato número-dígito verificador (ej.: 1234567-9)", valor);
        const [, base, digito] = partes;
        if(Ruc.calcularDigitoVerificador(base) != Number(digito))
            throw new FieldValidationException(recurso, "ruc", "el dígito verificador no es válido", valor);
        this.valor = limpio;
    }

    /**
     * Dígito verificador según el algoritmo módulo 11 de la SET: cada dígito, de derecha a izquierda,
     * se multiplica por un factor que va de 2 a 11; el dígito es 11 - (suma % 11), o 0 si el resto es 0 o 1.
     */
    static calcularDigitoVerificador(base: string): number {
        let total = 0;
        let factor = 2;
        for(let i = base.length - 1; i >= 0; i--){
            if(factor > 11) factor = 2;
            total += Number(base[i]) * factor;
            factor++;
        }
        const resto = total % 11;
        return resto > 1 ? 11 - resto : 0;
    }
}
