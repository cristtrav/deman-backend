import { Empresa } from "../model/empresa";

export abstract class ReciboEmpresaRepository {
    /**
     * Copia los datos de la empresa en los recibos que todavía no los tienen
     * (los emitidos antes de que existiera la empresa) y devuelve cuántos se completaron.
     * Los recibos que ya tienen los datos no se modifican.
     */
    abstract completarRecibosSinEmpresa(empresa: Empresa): Promise<number>;
}
