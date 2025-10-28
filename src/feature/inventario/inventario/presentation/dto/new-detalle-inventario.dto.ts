import { IsNotEmpty, IsNumber } from "class-validator";

export class NewDetalleInventarioDTO {
    @IsNumber()
    @IsNotEmpty()
    idproducto: number;
    @IsNumber()
    @IsNotEmpty()
    idvariante: number;
    @IsNumber()
    @IsNotEmpty()
    cantidad: number;
}