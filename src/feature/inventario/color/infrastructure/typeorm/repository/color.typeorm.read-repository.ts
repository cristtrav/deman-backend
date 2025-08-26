import { QueryContract } from "@core/application/contract/query/query.contract";
import { ConsultarColoresResult } from "@feature/inventario/color/application/contract/result/consultar-color.result";
import { ColorReadRepository } from "@feature/inventario/color/application/read-repository/color.read-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorTypeORMModel } from "../model/color.typeorm.model";
import { Repository } from "typeorm";
import { QueryFindOptionsMapper } from "@core/infrastructure/typeorm/mapper/query-find-options.mapper";
import { COLOR_TYPEORM_MAPPING } from "../mapping/color.typeorm.mapping";
import { ColorTypeORMMapper } from "../mapper/color.typeorm.mapper";
import { Color } from "@feature/inventario/color/domain/model/color.entity";

export class ColorTypeORMReadRepository implements ColorReadRepository{
    constructor(
        @InjectRepository(ColorTypeORMModel)
        private colorTypeORMRepo: Repository<ColorTypeORMModel>
    ){}
    async consultar(query: QueryContract): Promise<ConsultarColoresResult> {
       const options = QueryFindOptionsMapper.toFindOptions<Color,ColorTypeORMModel>(query, COLOR_TYPEORM_MAPPING);
       const  data = (await this.colorTypeORMRepo.find(options)).map(c => ColorTypeORMMapper.toDomain(c))
       const result: ConsultarColoresResult = {data }
       if(query.pagination) result.page = {
        page: query.pagination.page,
        pageSize: query.pagination.page,
        total: await this.colorTypeORMRepo.count(options)
        }
        return result
       }
    }
