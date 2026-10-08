import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

/**
 * Datos de la empresa emisora que se copian en cada recibo.
 */
export class Empresa {
    public readonly nombre: string;
    public readonly direccion?: string;
    public readonly ruc?: string;
    public readonly telefono?: string;

    public constructor(nombre: string, direccion?: string | null, ruc?: string | null, telefono?: string | null){
        if(nombre == null) throw new RequiredFieldException("Empresa", "nombre");
        this.nombre = nombre;
        this.direccion = direccion ?? undefined;
        this.ruc = ruc ?? undefined;
        this.telefono = telefono ?? undefined;
    }
}
