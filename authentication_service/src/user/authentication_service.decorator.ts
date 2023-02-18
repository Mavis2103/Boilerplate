import { SetMetadata } from '@nestjs/common';
import { PermissionAction, PermissionObjectType } from './casl-ability.factory';

export const PERMISSION_DECORATOR_KEY = 'permissions_check';
export type ArgRequiredPermission = [PermissionAction, PermissionObjectType];
export const CheckPermissions = (...args: ArgRequiredPermission[]) =>
  SetMetadata('permissions_check', args);
