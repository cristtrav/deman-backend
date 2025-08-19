export class ApiResponsePaginationDTO {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;

    constructor(page: number, pageSize: number, total: number, ){
        this.total = total;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = Math.ceil(total/pageSize);
    }
}