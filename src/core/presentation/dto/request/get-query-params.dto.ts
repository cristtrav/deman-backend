import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";

export class GetQueryParamsDTO {
    @IsOptional()
    sort?: string;

    @IsOptional()
    sortOrder?: 'asc' | 'desc' = 'asc'

    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    pageSize?: number;

    @IsOptional()
    search?: string;

    @IsOptional()
    @Transform(({value}) => (typeof value == 'string' ? value.split(',') : value))
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({each: true})
    searchFields?: string[];
}