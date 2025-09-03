import { UnidadMedida } from "../model/unidad-medida";

export abstract class UnidadMedidaRepository {
    abstract findById(id: string): Promise<UnidadMedida | undefined>;
}