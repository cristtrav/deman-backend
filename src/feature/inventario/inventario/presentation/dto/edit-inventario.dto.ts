import { IsArray, IsDateString, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { NewDetalleInventarioDTO } from "./new-detalle-inventario.dto";
import { Type } from "class-transformer";
import { EditDetalleInventarioDTO } from "./edit-detalle-inventario.dto";

export class EditInventarioDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsDateString()
    fecha: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EditDetalleInventarioDTO)
    detalles: EditDetalleInventarioDTO[]
}