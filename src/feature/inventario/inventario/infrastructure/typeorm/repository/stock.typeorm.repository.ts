import { Stock } from "@feature/inventario/inventario/domain/model/stock";
import { StockId } from "@feature/inventario/inventario/domain/model/stock-id";
import { StockRepository } from "@feature/inventario/inventario/domain/repository/stock.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StockTypeORMModel } from "../model/stock.typeorm.model";
import { Repository } from "typeorm";
import { StockTypeORMMapper } from "../mapper/stock.typeorm.mapper";

export class StockTypeORMRepository implements StockRepository {
    
    constructor(
        @InjectRepository(StockTypeORMModel)
        private stockTypeOrmRepo: Repository<StockTypeORMModel>
    ){}

    async create(stock: Stock): Promise<Stock> {        
        console.log(StockTypeORMMapper.toORM(stock))
        const savedStock = await this.stockTypeOrmRepo.save(StockTypeORMMapper.toORM(stock));
        return StockTypeORMMapper.toDomain(savedStock);
    }
    async edit(stock: Stock): Promise<Stock> {
        const savedStock = await this.stockTypeOrmRepo.save(StockTypeORMMapper.toORM(stock));
        return StockTypeORMMapper.toDomain(savedStock);
    }
    async findById(id: StockId): Promise<Stock | null> {
        const stockOrm = await this.stockTypeOrmRepo.findOneBy({
            idDeposito: id.idDeposito,
            idProducto: id.idProducto,
            idVariante: id.idVariante
        });
        if(stockOrm == null) return null;
        return StockTypeORMMapper.toDomain(stockOrm);
    }

}