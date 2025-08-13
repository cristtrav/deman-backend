import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/infrastructure/database/database.module';
import { MarcaModule } from './marca/infrastructure/module/marca.module';

@Module({
  imports: [
    DatabaseModule,
    MarcaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
