import { Controller, Get, Inject } from '@nestjs/common';
import { IAppService } from './app-service.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('IAppService') private readonly appService: IAppService,
  ) {}

  @Get()
  getHello(): { title: string } {
    return this.appService.getHello();
  }
}
