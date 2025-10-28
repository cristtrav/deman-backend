import { Provider } from "@nestjs/common";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { ProductoTypeORMRepository } from "../typeorm/repository/producto.typeorm.repository";
import { VarianteRepository } from "../../domain/repository/variante.repository";
import { VarianteTypeORMRepository } from "../typeorm/repository/variante.typeorm.repository";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { InventarioTypeORMModel } from "../typeorm/model/inventario.typeorm.model";
import { InventarioTypeORMRepository } from "../typeorm/repository/inventario.typeorm.repository";
import { StockRepository } from "../../domain/repository/stock.repository";
import { StockTypeORMRepository } from "../typeorm/repository/stock.typeorm.repository";

export default <Provider[]> [
    {
        provide: ProductoRepository,
        useClass: ProductoTypeORMRepository
    },
    {
        provide: VarianteRepository,
        useClass: VarianteTypeORMRepository
    },
    {
        provide: InventarioRepository,
        useClass: InventarioTypeORMRepository
    },
    {
        provide: StockRepository,
        useClass: StockTypeORMRepository
    }
]