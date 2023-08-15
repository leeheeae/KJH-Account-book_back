import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '테렌즈 구출 프로젝트';
  }
}
