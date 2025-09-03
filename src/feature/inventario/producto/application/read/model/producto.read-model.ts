import { CategoriaRead } from "./categoria.read-model";
import { MarcaRead } from "./marca.read-model";
import { TipoRead } from "./tipo.read-model";
import { UnidadMedidaRead } from "./unidad-medida.read-model";

export interface ProductoRead {
    id: number,
    descripcion: string,
    precio: string,
    marca: MarcaRead,
    tipo: TipoRead,
    categoria: CategoriaRead,
    unidadMedida: UnidadMedidaRead
}