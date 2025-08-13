import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponseDTO } from './core/presentation/dto/api-response.dto';
import { BusinessRuleException } from './core/domain/exception/business-rule.exception';
import { NotFoundException } from './core/domain/exception/not-found.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponseDTO<string>{
    return ApiResponseDTO.success(this.appService.getHello());
  }
}

