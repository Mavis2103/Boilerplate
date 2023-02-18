import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KeycloakService {
  constructor(private readonly httpService: HttpService) {}

  async adminToken() {
    const KEYCLOAK_AUTH_PARAMS = `grant_type=client_credentials&client_id=${process.env.KEYCLOAK_ADMIN_CLI}&client_secret=${process.env.KEYCLOAK_ADMIN_CLI_SECRET}`;
    const rs: any = await lastValueFrom(
      this.httpService.post(
        `/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        KEYCLOAK_AUTH_PARAMS,
        {
          headers: {
            Accept: 'application/x-www-form-urlencoded',
          },
        },
      ),
    );
    return rs.data;
  }
}
