import { QueryContract } from "@core/application/contract/query/query.contract";
import { Equal, EqualOperator, FindManyOptions, FindOperator, ILike, LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";
import { EntityTypeORMMap } from "../mapping/entity-typeorm.map";
import { FilterOperatorType } from "@common/type/filter-operator.type";
/**
 * Esta clase es para convertir entre QueryContract (capa application)
 * y FindOptions de TypeORM
 */
export class QueryFindOptionsMapper{
    /**
     * Convierte un QueryContract a un FindManyOptions
     * usando los mappings de atributos de la entidad
     */
    static toFindOptions<E, O>(query: QueryContract, fieldMap: EntityTypeORMMap<E, O>): FindManyOptions<O>{
        const options: FindManyOptions<O> = {}
        if(query.sort && fieldMap.hasKey(query.sort.field)){            
            options.order = { }
            options.order[`${fieldMap.getAsString(query.sort.field)}`] = query.sort.order;
        }
        if(query.filters){
            options.where = { }
            for(let filter of query.filters){
                if(!fieldMap.hasKey(filter.field)) continue;
                const fieldPath = fieldMap.getAsString(filter.field)
                const whereFieldName = this.getWhereFieldName(fieldPath);
                options.where[`${whereFieldName}`] = this.getWhereValue(filter.operator, fieldPath, filter.value);
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
        }
        console.log(options)
        return options;
    }

    /**
     * Extrae el nombre del campo a usar en la consulta Where a partir de un path
     * @param path La ruta. Ej.: unidadMedida.abreviatura.singular
     * @returns el nombre del campo en la consulta Where. Ej.: unidadMedida
     */
    private static getWhereFieldName(path: string): string{
        if(!path.includes(".")) return path;
        const elements = path.split('.');
        return elements[0];
    }

    /**
     * Construye el objeto de consulta para el Where de FindOptions
     * @param op El operador: eq, neq, like, lte, gte
     * @param path La ruta del atributo. Ej.: marca.id
     * @param value El valor a filtrar. Ej.: 101 
     * @returns El objeto de consulta para FindOptions. Ej. { marca: { id: Equals(101) }}
     */
    private static getWhereValue(op: FilterOperatorType, path: string, value: any): any{
        if(!path.includes(".")) return this.getWhereOp(op, value);
        const opValue = this.getWhereOp(op, value);
        return this.stringToNestedObject(path, opValue, true)
    }

    /**
     * Convierte un Operador a un EqualOperator o FindOperator de TypeORM
     * @param op El operador: eq, neq, like, lte, gte
     * @param value El valor a filtrar. Ej.: 101
     * @returns El valor para FindOptions. Ej.: Equals(101)
     */
    private static getWhereOp(op: FilterOperatorType, value: any): EqualOperator<any> | FindOperator<any>{
        if(op == 'eq') return Equal(value);
        else if(op == 'like') return ILike(`%${value}%`);
        else if(op == 'neq') return Not(value);
        else if(op == 'gte') return MoreThanOrEqual(value);
        else return LessThanOrEqual(value);
    }

    /**
     * Convierte una ruta separada por puntos a un objeto anidado.
     * @param path La ruta del atributo. Ej.: marca.id
     * @param value El valor a filtrar. Ej.: 101
     * @param ignoreFirst Si se va a ignorar el primer token de la ruta
     * @returns el objeto anidado
     */
    private static stringToNestedObject(path: string, value, ignoreFirst = false) {
    let parts = path.split('.');
    if (ignoreFirst) parts.shift();

    return parts.reduceRight((acc, key) => {
        return { [key]: acc };
    }, value);
    }
}