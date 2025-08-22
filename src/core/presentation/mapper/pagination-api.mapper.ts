import { ApiResponsePaginationDTO } from "../dto/response/api-response-pagination.dto";
import { ResultPageContract } from "@core/application/contract/result/result-page.contract";

export class PaginationApiMapper{
    static toApiResponsePaginationDTO(pagination: ResultPageContract): ApiResponsePaginationDTO{
        return new ApiResponsePaginationDTO(
            pagination.page,
            pagination.pageSize,
            pagination.total
        );
    }
}