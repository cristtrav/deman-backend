import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
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

    @IsString()
    @IsOptional()
    observacion?: string;
}