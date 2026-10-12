import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";
import { PERIODOS_ENTREGA } from "@feature/pedido/application/contract/data/periodo-entrega";
import type { PeriodoEntrega } from "@feature/pedido/application/contract/data/periodo-entrega";

export class GetProximasEntregasQueryParamDTO {
    @IsIn(PERIODOS_ENTREGA)
    periodo: PeriodoEntrega;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    pageSize: number = 5;
}
