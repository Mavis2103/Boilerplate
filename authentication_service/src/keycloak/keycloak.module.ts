import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: process.env.KEYCLOAK_BASEURL,
    }),
  ],
  providers: [KeycloakService],
})
export class KeycloakModule {}
