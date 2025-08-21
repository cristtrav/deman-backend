import { Provider } from "@nestjs/common";
import { CrearCategoriaUseCase } from "../../application/usecase/crear.usecase";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { ConsultarCategoriasUseCase } from "../../application/usecase/consultar.usecase";
import { CategoriaReadRepository } from "../../application/read-repository/categoria.read-repository";
import { EditarCategoriaUseCase } from "../../application/usecase/editar.usecase";
import { EliminarCategoriaUseCase } from "../../application/usecase/eliminar.usecase";

export default <Provider[]> [
    {
        provide: CrearCategoriaUseCase,
        useFactory: (categoriaRepository: CategoriaRepository) => new CrearCategoriaUseCase(categoriaRepository),
        inject: [ CategoriaRepository ]
    },
    {
        provide: ConsultarCategoriasUseCase,
        useFactory: (categoriaReadRepository: CategoriaReadRepository) => new ConsultarCategoriasUseCase(categoriaReadRepository),
        inject: [ CategoriaReadRepository ]
    },
    {
        provide: EditarCategoriaUseCase,
        useFactory: (categoriaRepository: CategoriaRepository) => new EditarCategoriaUseCase(categoriaRepository),
        inject: [ CategoriaRepository ]
    },
    {
        provide: EliminarCategoriaUseCase,
        useFactory: (categoriaRepository: CategoriaRepository) => new EliminarCategoriaUseCase(categoriaRepository),
        inject: [ CategoriaRepository ]
    }
]