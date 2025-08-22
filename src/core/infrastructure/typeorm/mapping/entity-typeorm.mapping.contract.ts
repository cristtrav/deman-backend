/**
 * Este tipo mapea los nombres de los atributos de un Entity (capa domain) 
 * de un Read Entity (capa application) a los nombres de atributos 
 * de un Entity de TypeORM (capa infrastructure)
 * 
 * E = Entity Class
 * O = TypeORM Entity Class
 */
export type EntityTypeORMMapping<E, O> = {[k in keyof Partial<E>]: keyof O}