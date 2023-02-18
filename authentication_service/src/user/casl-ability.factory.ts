import { PureAbility } from '@casl/ability';
import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
export type PermissionObjectType = any;
export type AppAbility = PureAbility<[PermissionAction, PermissionObjectType]>;

interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly httpService: HttpService) {}
  async userAbility(token): Promise<AppAbility> {
    const KEYCLOAK_AUTH_PARAMS = `token=${token}&client_id=${process.env.KEYCLOAK_ADMIN_CLI}&client_secret=${process.env.KEYCLOAK_ADMIN_CLI_SECRET}`;
    const rs: AxiosResponse = await lastValueFrom(
      this.httpService.post(
        `/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        KEYCLOAK_AUTH_PARAMS,
        {
          headers: {
            Accept: 'application/x-www-form-urlencoded',
          },
        },
      ),
    );
    const caslPermissions: CaslPermission[] = rs.data.resource_access[
      'lalahome-be'
    ].roles?.map((p) => {
      const permission = p.split('-');
      return {
        action: {
          read: PermissionAction.READ,
          create: PermissionAction.CREATE,
          update: PermissionAction.UPDATE,
          delete: PermissionAction.DELETE,
        }[permission[0]],
        subject: permission[1],
      };
    });
    return new PureAbility<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
