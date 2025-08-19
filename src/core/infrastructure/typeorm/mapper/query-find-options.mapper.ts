import { EntityTypeORMMapping } from "@core/infrastructure/typeorm/mapping/entity-typeorm.mapping.contract";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { Equal, FindManyOptions, ILike, LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";
/**
 * Esta clase es para convertir entre QueryContract (capa application)
 * y FindOptions de TypeORM
 */
export class QueryFindOptionsMapper{
    /**
     * Convierte un QueryContract a un FindManyOptions
     * usando los mappings de atributos de la entidad
     */
    static toFindOptions<E, O>(query: QueryContract, fieldMapping: EntityTypeORMMapping<E, O>): FindManyOptions<O>{
        const options: FindManyOptions<O> = {}
        if(query.sort){
            options.order = { }
            options.order[`${fieldMapping[query.sort.field]}`] = query.sort.order;
        }
        if(query.filters){
            options.where = {}
            for(let filter of query.filters){                
                if(filter.operator == 'eq')
                    options.where[`${fieldMapping[filter.field]}`] = Equal(filter.value) ;
                else if(filter.operator == 'like')
                    options.where[`${fieldMapping[filter.field]}`] = ILike(`%${filter.value}%`);
                else if(filter.operator == 'neq')
                    options.where[`${fieldMapping[filter.field]}`] = Not(filter.value);
                else if(filter.operator == 'gte')
                    options.where[`${fieldMapping[filter.field]}`] = MoreThanOrEqual(filter.value);
                else
                    options.where[`${fieldMapping[filter.field]}`] = LessThanOrEqual(filter.value);
            }
        }
        if(query.pagination){
            options.take = query.pagination.pageSize;
            options.skip = (query.pagination.page - 1) * query.pagination.pageSize;
        }
        if(query.sort){
            options.order = {};
            options.order[`${query.sort.field}`] = query.sort.order
        }
        if(query.search){
            const searchFields = {}
            for(let field of query.search.fields){
                searchFields[`${field}`] = ILike(`%${query.search.q}%`)
            }
            options.where = { ...options.where, ...searchFields }
            console.log(options.where)
        }
        return options;
    }
}