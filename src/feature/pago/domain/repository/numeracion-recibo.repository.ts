export abstract class NumeracionReciboRepository {
    /**
     * Reserva el siguiente número de recibo. Debe llamarse dentro de una transacción:
     * si esta se revierte, el número vuelve a quedar disponible y la numeración no tiene huecos.
     */
    abstract siguiente(): Promise<number>;
}
