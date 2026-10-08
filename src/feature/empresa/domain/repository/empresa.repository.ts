import { Empresa } from "../model/empresa";

export abstract class EmpresaRepository {
    abstract obtener(): Promise<Empresa | null>;
    abstract guardar(empresa: Empresa): Promise<Empresa>;
}
