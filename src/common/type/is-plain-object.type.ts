export type IsPlainObject<T> =
  T extends Function ? false :
  T extends any[] ? false :
  T extends object ? true :
  false;