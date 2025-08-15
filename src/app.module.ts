import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from '@core/infrastructure/database/database.module';
import { GlobalExceptionFilter } from '@core/infrastructure/filter/global-exception/global-exception.filter';
import { MarcaModule } from '@feature/marca/infrastructure/module/marca.module';
import { ColorModule } from '@feature/color/infrastructure/module/color.module';
import { TipoModule } from '@feature/tipo/infrastructure/module/tipo.module';

@Module({
  imports: [
    DatabaseModule,
    MarcaModule, 
    ColorModule, 
    TipoModule
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
