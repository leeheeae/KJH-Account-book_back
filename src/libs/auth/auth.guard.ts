import { AllowedRoles } from './role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';

// AuthGuard 활용법에 대해서 연구해보기

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly log: LoggerService) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>('role', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }

    return roles.includes(user.role);
  }
}
