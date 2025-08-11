export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
    pagination?: PaginationMetadata;

    private constructor(
        success: boolean,
        message: string,
        data?: T,
        errors?: string[] | null,
        pagination?: PaginationMetadata
    ){
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors ?? undefined;
        this.pagination = pagination;
    }

    static success<T>(data?: T, message = 'Operación exitosa'): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data);
    }

    static error(message = 'Error en la operación', errors?: string[]): ApiResponse<null> {
        return new ApiResponse<null>(false, message, null, errors);
    }

    static paginated<T>(
        data: T,
        message = 'Operación exitosa',
        pagination: PaginationMetadata
    ): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data, null, pagination);
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