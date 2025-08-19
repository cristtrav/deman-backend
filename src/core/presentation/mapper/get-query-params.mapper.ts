import { QueryContract } from "@core/application/contract/query/query.contract";
import { GetQueryParamsDTO } from "../dto/request/get-query-params.dto";
import { QueryFilterContract } from "@core/application/contract/query/query-filter.contract";
import { FILTER_OPERATORS } from "@common/const/filter-operators.const";
import { FilterOperatorType } from "@common/type/filter-operator.type";

export class GetQueryParamsMapper{
    static toQueryContract(getQueryParam: GetQueryParamsDTO): QueryContract{
        const { page, pageSize, sort, sortOrder, search, searchFields, ...filters } = getQueryParam;
        const query: QueryContract = {};
        if(page != null || pageSize != null) query.pagination = {
            page: page ?? 1,
            pageSize: pageSize ?? 10
        }
        if(sort) query.sort = {
            field: sort,
            order: sortOrder != null ? <'asc' | 'desc'> sortOrder : 'asc'
        }
        if(search && searchFields) query.search = { 
            q: search,
            fields: searchFields
        }

        if(
            filters &&
            Object.keys(filters).length > 0 &&
            Object.keys(filters).some(key => filters[key] != null)
        ){
            const queryFilters: QueryFilterContract[] = [];
            for(let field of Object.keys(filters)){
                if(filters[field] == null) continue;

                const val = filters[field];
                queryFilters.push({
                    field,
                    value: this.hasOperator(val) ? this.getValue(val) : val,
                    operator: this.hasOperator(val) ? this.getOperator(val) : 'eq'
                })
            }
            query.filters = queryFilters;
        } 
        return query;
    }

    private static hasOperator(value: string): boolean{
        return FILTER_OPERATORS.filter(
            op => value.startsWith(`${op}:`)
        ).length > 0
    }

    private static getOperator(value: string): FilterOperatorType {
        return <FilterOperatorType> value.split(':', 1)[0];
    }

    private static getValue(value: string): string {
        return value.split(':').slice(1).join("");
    }
}