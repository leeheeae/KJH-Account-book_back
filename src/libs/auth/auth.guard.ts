import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    return roles.includes(user.role);
  }
}
