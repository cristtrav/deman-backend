import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/infrastructure/database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './core/infrastructure/http/filter/global-exception/global-exception.filter';

@Module({
  imports: [
    DatabaseModule,
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
