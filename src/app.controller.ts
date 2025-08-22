import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponseDTO } from './core/presentation/dto/response/api-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponseDTO<string>{
    return ApiResponseDTO.success({data: this.appService.getHello()});
  }
}

