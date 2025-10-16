import { IsNotEmpty } from "class-validator";

export class NewClienteDTO {
    id?: number; 
    @IsNotEmpty()
    razonSocial: string;
    ruc: string;
    telefono: string
}