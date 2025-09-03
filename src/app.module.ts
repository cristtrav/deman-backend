import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from '@core/infrastructure/database/database.module';
import { GlobalExceptionFilter } from '@core/infrastructure/filter/global-exception/global-exception.filter';
import { CategoriaModule } from './feature/inventario/categoria/infrastructure/module/categoria.module';
import { MarcaModule } from '@feature/inventario/marca/infrastructure/module/marca.module';
import { ProductoModule } from './feature/inventario/producto/infrastructure/module/producto.module';

@Module({
  imports: [
    DatabaseModule,
    MarcaModule,
    CategoriaModule,
    ProductoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
})
export class AppModule {}
