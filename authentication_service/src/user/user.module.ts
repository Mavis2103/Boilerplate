import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

import { HttpModule } from '@nestjs/axios';
import { KeycloakService } from 'src/keycloak/keycloak.service';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: process.env.KEYCLOAK_BASEURL,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, KeycloakService, CaslAbilityFactory],
})
export class UserModule {}
