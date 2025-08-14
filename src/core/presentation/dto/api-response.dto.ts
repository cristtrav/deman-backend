import { ResponseBase } from "./response-base";

export class ApiResponseDTO<T> extends ResponseBase {    
    data?: T;
    pagination?: PaginationMetadata;

    private constructor(
        message: string,
        data?: T,
        pagination?: PaginationMetadata
    ){
        super(true, message);
        this.data = data;
        this.pagination = pagination;
    }

    static success<T>(data?: T, message = 'Operación exitosa'): ApiResponseDTO<T> {
        return new ApiResponseDTO<T>(message, data);
    }

    static paginated<T>(
        data: T,
        message = 'Operación exitosa',
        pagination: PaginationMetadata
    ): ApiResponseDTO<T> {
        return new ApiResponseDTO<T>(message, data, pagination);
    }
}

export class PaginationMetadata {
    readonly total: number;
    readonly page: number;
    readonly pageSize: number;
    readonly totalPages: number;

    constructor(total: number, page: number, pageSize: number){
        this.total = total;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = Math.ceil(total/pageSize);
    }
}