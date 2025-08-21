import { BaseApiResponse } from "./base-api-response";
import { ApiResponsePaginationDTO } from "./api-response-pagination.dto";

export class ApiResponseDTO<T> extends BaseApiResponse {    
    data?: T;
    pagination?: ApiResponsePaginationDTO;

    private constructor(
        message: string,
        data?: T,
        pagination?: ApiResponsePaginationDTO
    ){
        super(true, message);
        this.data = data;
        this.pagination = pagination;
    }

    static success<T>(params?: {
         data?: T,
         message?: string,
         pagination?: ApiResponsePaginationDTO
    }): ApiResponseDTO<T> {
        return new ApiResponseDTO<T>(params?.message ?? 'Operación exitosa', params?.data, params?.pagination);
    }
}