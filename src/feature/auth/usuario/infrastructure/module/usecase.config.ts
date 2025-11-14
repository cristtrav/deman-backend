import { Provider } from "@nestjs/common";
import { ConsultarUsuariosUseCase } from "../../application/usecase/consultar-usuarios.usecase";
import { UsuarioReadRepository } from "../../application/read-repository/usuario.read-repository";
import { CrearUsuarioUseCase } from "../../application/usecase/crear-usuario.usecase";
import { EditarUsuarioUseCase } from "../../application/usecase/editar-usuario.usecase";
import { UsuarioRepository } from "../../domain/repository/usuario.repository";
import { EliminarUsuarioUseCase } from "../../application/usecase/eliminar-usuario.usecase";
import { EditarPasswordUseCase } from "../../application/usecase/editar-password.usecase";

export default <Provider[]>[
    {
            provide: ConsultarUsuariosUseCase,
            useFactory: (usuarioReadRepository: UsuarioReadRepository) => new ConsultarUsuariosUseCase(usuarioReadRepository),
            inject: [ UsuarioReadRepository ]
        },
        {
            provide: CrearUsuarioUseCase,
            useFactory: (
                usuarioRepository: UsuarioRepository
            ) => new CrearUsuarioUseCase(
                usuarioRepository
            ),
            inject: [
                UsuarioRepository
            ]
        },
        {
            provide: EditarUsuarioUseCase,
            useFactory: (
                usuarioRepository: UsuarioRepository
            ) => new EditarUsuarioUseCase(
                usuarioRepository,
            ),
            inject: [
                UsuarioRepository,
            ]
        },
        {
            provide: EliminarUsuarioUseCase,
            useFactory: (usuarioRepository: UsuarioRepository) => new EliminarUsuarioUseCase(usuarioRepository),
            inject: [ UsuarioRepository ]
        },
        {
            provide: EditarPasswordUseCase,
            useFactory: (usuarioRepository: UsuarioRepository) => new EditarPasswordUseCase(usuarioRepository),
            inject: [ UsuarioRepository ]
        }
]