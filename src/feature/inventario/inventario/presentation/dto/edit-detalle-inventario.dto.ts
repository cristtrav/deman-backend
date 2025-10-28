import { IsNotEmpty, IsNumber } from "class-validator";

export class EditDetalleInventarioDTO {
    @IsNumber()
    id?: number;
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