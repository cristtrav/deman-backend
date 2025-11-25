import { IsArray, IsDateString, IsOptional, IsString, ValidateNested } from "class-validator";
import { NewDetalleInventarioDTO } from "./new-detalle-inventario.dto";
import { Type } from "class-transformer";

export class NewInventarioDTO {
    @IsDateString()
    fecha: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NewDetalleInventarioDTO)
    detalles: NewDetalleInventarioDTO[]

    @IsString()
    @IsOptional()
    observacion?: string;
}