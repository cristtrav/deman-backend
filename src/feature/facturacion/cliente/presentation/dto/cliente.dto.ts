import { IsNotEmpty } from "class-validator";

export class ClienteDTO {
    @IsNotEmpty()
    id: number; 
    @IsNotEmpty()
    razonSocial: string;
    ruc: string;
    telefono: string
}