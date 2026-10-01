import { GetQueryParamsDTO } from "@core/presentation/dto/request/get-query-params.dto";
import { IsOptional, IsString } from "class-validator";

export class GetPagosQueryParamDTO extends GetQueryParamsDTO {
    @IsOptional()
    @IsString()
    id?: string;
}
