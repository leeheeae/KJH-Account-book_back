import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AllowedRoles = keyof typeof UserRole;

export const Role = (roles: AllowedRoles[]) => SetMetadata('role', roles);
