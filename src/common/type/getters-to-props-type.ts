export type GettersToProps<T> = {
  // Propiedades que NO son funciones (se copian igual)
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
} & {
  // Métodos sin parámetros => convertidos a propiedades
  [K in keyof T as Extract<T[K], (...args: any[]) => any> extends () => any ? K : never]:
    ReturnType<Extract<T[K], (...args: any[]) => any>>
};