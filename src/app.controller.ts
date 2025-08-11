import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from './core/presentation/response/api-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse<string>{
    return ApiResponse.success(this.appService.getHello());
  }
}
