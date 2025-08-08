
## Descripción

Aplicación del lado servidor para el software de gestión comercial Deman Store.

## Stack de tecnologías
- Nodejs v22
- Nestjs v11
- PostgreSQL

## Estructura de carpetas

```bash
deman-backend
├── dist/                           # Código compilado para producción
├── src/                            # Código fuente principal
│   ├── config/                     # Configuraciones globales
│   ├── features/                   # Features o modulos de la app
│   ├── infrastructure/             # Configuraciones globales de infraestructura
│   │   └── database/               # Configuraciones globales base de datos
│   │       ├── migrations/         # Migraciones de la base de datos
│   │       └── sql/                # Archivos SQL asociados a las migraciones
│   │       ├── database.module.ts  # Módulo de Base de Datos
│   │       └── datasource.ts       # Datasource para uso en Migraciones
│   ├── app.module.ts               # Módulo principal de la app
│   └── main.ts                     # Punto de entrada de la app
├── tests/                          # Pruebas automatizadas
├── .env                            # Variables de entorno
├── .gitignore                      # Archivos ignorados
├── .prettierrc                     # Configuración de Prettier
├── eslint.config.mjs               # Configuración de Eslint
├── nest-cli.json                   # Configuración de Nest CLI
├── package-lock.json               # Lock del proyecto
├── package.json                    # Configuración y dependencias generales
└── README.md                       # Documentación
├── tsconfig.build.json             # Configuración de compilación
└── tsconfig.json                   # Configuración de TypeScript
```

## Arquitectura

Al momento de crear las features seguir la Clean Architecture de tipo Onion siguiendo la siguiente estructura de carpetas, agregando las que se requieran respetando las capas y su propósito:

```bash
feature
├── application/         # Capa de aplicación
│   └── usecase/         # Casos de uso de la aplicación
├── domain/              # Capa de dominio o negocio
│   ├── model/           # Modelos de dominio
│   └── repository/      # Repositorios de dominio
├── infrastructure/      # Capa de infraestructura
    └── typeorm/         # ORM de acceso a BD
        ├── model/       # Modelos ORM
│       └── repository/  # Repositorios ORM (Implementacion de repositorio de dominio)
└── presentation/        # Capa de presentacion (presentacion al usuaro o consumidor)
    ├── controller/      # Controladores HTTP/REST
    └── dto/             # Data Transfer Objects
```

## Instalación de dependencias

```bash
$ npm install
```

## Variables de entorno (archivo .env)

```bash
DB_HOST=localhost #Host de la base de datos
DB_PORT=5432 #Puerto de PostgreSQL
DB_USERNAME=<user> #Usuario de la base de datos
DB_PASSWORD=<password> #Contraseña de la base de datos
DB_NAME=deman-db #Nombre de la base de datos
```
## Migraciones de Base de Datos

Los cambios en la base de datos se incorporan exclusivamente mediante migraciones a modo de gestión de versiones.

```bash
# Ver las migraciones ejecutadas y pendientes
$ npm run migration:show

# Ejecutar todas las actualizaciones y modificaciones de base de datos
$ npm run migration:run

# Crear una nueva migración
$ npm run migration:create --name=<nombremigracion>

# Revertir migraciones (Una a la vez)
$ npm rum migration:revert
```

## Compilar y ejecutar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
