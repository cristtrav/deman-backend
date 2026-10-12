import { Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PasswordHasher } from "../../application/port/password-hasher";
import { TokenService } from "../../application/port/token.service";
import { BcryptPasswordHasher } from "../bcrypt/bcrypt-password-hasher";
import { JwtConfig } from "../jwt/jwt.config";
import { JwtTokenService } from "../jwt/jwt-token.service";
import { AdministradorInicialProvider } from "../../application/port/administrador-inicial.provider";
import { EnvAdministradorInicialProvider } from "../env/env-administrador-inicial.provider";

export default <Provider[]>[
    {
        provide: JwtConfig,
        useFactory: () => JwtConfig.fromEnv()
    },
    {
        provide: TokenService,
        useFactory: (jwtService: JwtService, jwtConfig: JwtConfig) => new JwtTokenService(jwtService, jwtConfig),
        inject: [JwtService, JwtConfig]
    },
    {
        provide: PasswordHasher,
        useClass: BcryptPasswordHasher
    },
    {
        provide: AdministradorInicialProvider,
        useClass: EnvAdministradorInicialProvider
    }
]
