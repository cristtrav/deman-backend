import { Stock } from "../model/stock";
import { StockId } from "../model/stock-id";

export abstract class StockRepository {
    abstract create(stock: Stock): Promise<Stock>;
    abstract edit(stock: Stock): Promise<Stock>;
    abstract findById(id: StockId): Promise<Stock | null>;
}