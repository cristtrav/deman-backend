import { NestedPrimitivePaths } from "@common/type/nested-primitive-paths.type";

export class EntityTypeORMMap<E,O> extends Map<NestedPrimitivePaths<E>, NestedPrimitivePaths<O>> {

    hasKey(key: string): boolean{
        return this.has(key as NestedPrimitivePaths<E>);
    }

    getAsString(key: string): string{
        const val = this.get(key as NestedPrimitivePaths<E>);
        if(val == null) throw new Error(`No se encuentra el valor de la clave «${key}»`);
        return val;
    }
    
}