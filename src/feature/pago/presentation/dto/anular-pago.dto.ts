import { IsNotEmpty, IsString } from "class-validator";

export class AnularPagoDTO {
    @IsString()
    @IsNotEmpty()
    motivo: string;
}
