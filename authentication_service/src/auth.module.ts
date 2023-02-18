import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

import { KeycloakConnectModule, TokenValidation } from 'nest-keycloak-connect';
import { KeycloakModule } from './keycloak/keycloak.module';
import { AuthorizationGuard } from './user/authentication_service.guard';
import { CaslAbilityFactory } from './user/casl-ability.factory';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.example'],
    }),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_BASEURL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET,
      logLevels: ['verbose'],
      tokenValidation: TokenValidation.ONLINE,
    }),
    KeycloakModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: process.env.KEYCLOAK_BASEURL,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    CaslAbilityFactory,
  ],
})
export class AppModule {}
