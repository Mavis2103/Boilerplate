import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import KeycloakConnect from 'keycloak-connect';
import {
  AuthGuard,
  KeycloakConnectConfig,
  KEYCLOAK_CONNECT_OPTIONS,
  KEYCLOAK_INSTANCE,
  KEYCLOAK_LOGGER,
  META_SKIP_AUTH,
  META_UNPROTECTED,
} from 'nest-keycloak-connect';
import { KeycloakMultiTenantService } from 'nest-keycloak-connect/services/keycloak-multitenant.service';
import {
  ArgRequiredPermission,
  PERMISSION_DECORATOR_KEY,
} from './authentication_service.decorator';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';

@Injectable()
export class AuthorizationGuard extends AuthGuard implements CanActivate {
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private singleTenant2: KeycloakConnect.Keycloak,
    @Inject(KEYCLOAK_CONNECT_OPTIONS)
    private keycloakOpts2: KeycloakConnectConfig,
    @Inject(KEYCLOAK_LOGGER)
    private logger2: Logger,
    private multiTenant2: KeycloakMultiTenantService,
    private reflector2: Reflector,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {
    super(singleTenant2, keycloakOpts2, logger2, multiTenant2, reflector2);
    this.abilityFactory = abilityFactory;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authKeycloak = await super.canActivate(context); //if keycloak authz false -> 403

    const isUnprotected = this.reflector2.getAllAndOverride<boolean>(
      META_UNPROTECTED,
      [context.getClass(), context.getHandler()],
    );
    const skipAuth = this.reflector2.getAllAndOverride<boolean>(
      META_SKIP_AUTH,
      [context.getClass(), context.getHandler()],
    );

    // If unprotected is set skip Keycloak authentication
    if (isUnprotected && skipAuth) {
      return true;
    }

    if (!authKeycloak) {
      return false;
    }
    const { headers } = context.switchToHttp().getRequest();
    const requiredPermission =
      this.reflector2?.get<ArgRequiredPermission[]>(
        PERMISSION_DECORATOR_KEY,
        context.getHandler(),
      ) || [];
    const accessToken = headers?.['authorization'];
    if (accessToken) {
      const b = await this.abilityFactory.userAbility(
        accessToken.split(' ')[1],
      );
      return requiredPermission.every((permission) =>
        this.isAllowed(b, permission),
      );
    } else {
      return false;
    }
  }
  private isAllowed(ability: AppAbility, permission: ArgRequiredPermission) {
    return ability.can(...permission);
  }
}
