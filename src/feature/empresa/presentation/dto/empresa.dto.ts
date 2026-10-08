import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class EmpresaDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    direccion?: string;

    // El formato y el dígito verificador se validan en el dominio
    @IsOptional()
    @IsString()
    ruc?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    telefono?: string;
}
