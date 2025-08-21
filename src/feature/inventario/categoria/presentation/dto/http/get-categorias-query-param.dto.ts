import { GetQueryParamsDTO } from "@core/presentation/dto/request/get-query-params.dto";
import { IsOptional, IsString } from "class-validator";

export class CategoriasGetQueryParamDTO extends GetQueryParamsDTO{
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    descripcion?: string
}