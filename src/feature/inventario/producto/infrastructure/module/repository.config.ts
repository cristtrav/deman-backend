import { Provider } from "@nestjs/common";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { MarcaTypeORMRepository } from "../typeorm/repository/marca.typeorm.repository";
import { TipoTypeORMRepository } from "../typeorm/repository/tipo.typeorm.repository";
import { TipoRepository } from "../../domain/repository/tipo.repository";
import { CategoriaTypeORMRepository } from "../typeorm/repository/categoria.typeorm.repository";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { UnidadMedidaRepository } from "../../domain/repository/unidad-medida.repository";
import { UnidadMedidaTypeORMRepository } from "../typeorm/repository/unidad-medida.typeorm.repository";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { ProductoTypeORMRepository } from "../typeorm/repository/producto.typeorm.repository";

export default <Provider[]>[
    {
        provide: MarcaRepository,
        useClass: MarcaTypeORMRepository
    },
    {
        provide: TipoRepository,
        useClass: TipoTypeORMRepository
    },
    {
        provide: CategoriaRepository,
        useClass: CategoriaTypeORMRepository
    },
    {
        provide: UnidadMedidaRepository,
        useClass: UnidadMedidaTypeORMRepository
    },
    {
        provide: ProductoRepository,
        useClass: ProductoTypeORMRepository
    },
]