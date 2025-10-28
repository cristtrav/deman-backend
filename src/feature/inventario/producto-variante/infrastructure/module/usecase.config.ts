import { Provider } from "@nestjs/common";
import { ConsultarProductosVariantes } from "../../application/usecase/consultar-productos-variantes.usecase";
import { ProductoVarianteReadRepository } from "../../application/read-repository/producto-variante.read-repository";

export default <Provider[]> [
    {
        provide: ConsultarProductosVariantes,
        useFactory: (productoVarianteReadRepo: ProductoVarianteReadRepository) => new ConsultarProductosVariantes(productoVarianteReadRepo),
        inject: [ ProductoVarianteReadRepository ]
    }
]