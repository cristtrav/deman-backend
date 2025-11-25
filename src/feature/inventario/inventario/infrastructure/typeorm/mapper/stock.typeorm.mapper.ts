import { Stock } from "@feature/inventario/inventario/domain/model/stock";
import { StockTypeORMModel } from "../model/stock.typeorm.model";
import { StockId } from "@feature/inventario/inventario/domain/model/stock-id";

export class StockTypeORMMapper {
    static toDomain(stockOrm: StockTypeORMModel): Stock{
        return new Stock(
            new StockId(stockOrm.idDeposito, stockOrm.idProducto, stockOrm.idVariante),
            Number(stockOrm.cantidad),
            stockOrm.ultimaActualizacion,
            Number(stockOrm.cantidadMinima)
        )
    }

    static toORM(stock: Stock): StockTypeORMModel{
        const stockOrm = new StockTypeORMModel();
        stockOrm.idDeposito = stock.id.idDeposito;
        stockOrm.idProducto = stock.id.idProducto;
        stockOrm.idVariante = stock.id.idVariante;
        stockOrm.cantidad = `${stock.cantidad}`;
        stockOrm.cantidadMinima = `${stock.cantidadMinima}`;
        stockOrm.ultimaActualizacion = stock.ultimaActualizacion;
        return stockOrm;
    }
}