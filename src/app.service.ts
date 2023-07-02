import { Injectable } from '@nestjs/common';
import { IAppService } from './app-service.interface';

@Injectable()
export class AppService implements IAppService {
  getHello(): { title: string } {
    return { title: 'KJH-companion-animal_back' };
  }
}
