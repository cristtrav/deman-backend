/**
 * Ejecuta una unidad de trabajo dentro de una transacción.
 * Si la función falla, se revierten todas las escrituras realizadas en ella.
 * Las llamadas anidadas se unen a la transacción en curso.
 */
export abstract class TransactionManager {
    abstract run<T>(work: () => Promise<T>): Promise<T>;
}
