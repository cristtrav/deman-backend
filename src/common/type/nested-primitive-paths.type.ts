import { ExtractStrKey } from "./extract-str-key.tyepe";
import { IsPlainObject } from "./is-plain-object.type";

// -------------- tilidades --------------
type Primitive = string | number | boolean | bigint | symbol | null | undefined;

// contador de profundidad (hasta 10 niveles aquí, puedes extenderlo)
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// -------------- NestedPaths que solo produce rutas a primitivos --------------
export type NestedPrimitivePaths<T, D extends number = 5> =
  [D] extends [never] ? never :
  {
    [K in ExtractStrKey<T>]:
      IsPlainObject<T[K]> extends true
        ? // si es objeto plano: solo expandir si aún queda profundidad
          `${K}.${NestedPrimitivePaths<T[K], Prev[D]>}`
        : // si no es objeto: incluir solo si es primitivo
          T[K] extends Primitive ? K : never
  }[ExtractStrKey<T>];
