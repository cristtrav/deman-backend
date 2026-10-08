import { ReciboData } from "../contract/data/recibo.data";

export abstract class ReciboReadRepository {
    abstract consultarPorNumero(numero: number): Promise<ReciboData | null>;
}
