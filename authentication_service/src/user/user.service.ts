import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { KeycloakService } from '../keycloak/keycloak.service';
import { lastValueFrom } from 'rxjs';
import { CaslAbilityFactory } from './casl-ability.factory';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly keycloakService: KeycloakService,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { email, password, type, ...others } = createUserDto;
      const token = await this.keycloakService.adminToken();
      const options = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: 'application/json',
        },
      };
      await lastValueFrom(
        this.httpService.post(
          `/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
          {
            credentials: [
              {
                type: 'password',
                value: password,
                temporary: false,
              },
            ],
            requiredActions: [],
            username: email,
            email: email,
            enabled: true,
            attributes: {
              ...others,
            },
          },
          options,
        ),
      );
      this.httpService
        .get(
          `/admin/realms/${process.env.KEYCLOAK_REALM}/users?username=${email}`,
          options,
        )
        .subscribe(({ data: user }) => {
          const { id: uid } = user[0];
          this.httpService
            .get(`/admin/realms/${process.env.KEYCLOAK_REALM}/roles`, options)
            .subscribe(({ data: roles }) => {
              const roleFilter = roles.filter(
                (role) => role.name === `lalahome-${type}`,
              );
              this.httpService
                .post(
                  `/admin/realms/${process.env.KEYCLOAK_REALM}/users/${uid}/role-mappings/realm`,
                  roleFilter,
                  options,
                )
                .subscribe();
            });
        });
    } catch (error) {
      const { status, data } = error.response;
      throw new HttpException(data.errorMessage, status);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const KEYCLOAK_AUTH_PARAMS = `grant_type=password&username=${email}&password=${password}`;
      const { data: tokens } = await lastValueFrom(
        this.httpService.post(
          `/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          KEYCLOAK_AUTH_PARAMS,
          {
            headers: {
              Accept: 'application/x-www-form-urlencoded',
              Authorization: process.env.TOKEN_BASIC,
            },
          },
        ),
      );
      const roles = await this.abilityFactory.userAbility(tokens?.access_token);
      return {
        ...tokens,
        roles,
      };
    } catch (error) {
      console.log(error);
      const { status, data } = error?.response;
      throw new HttpException(data.errorMessage, status);
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      const rs = await lastValueFrom(
        this.httpService.post(
          `/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          `grant_type=refresh_token&refresh_token=${refresh_token}`,
          {
            headers: {
              Authorization: process.env.TOKEN_BASIC,
              Accept: 'application/x-www-form-urlencode',
            },
          },
        ),
      );
      return rs.data;
    } catch (error) {
      const { status, data } = error.response;
      throw new HttpException(data.errorMessage, status);
    }
  }

  async logout(refresh_token: string) {
    try {
      const rs = await lastValueFrom(
        this.httpService.post(
          `/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`,
          `grant_type=refresh_token&refresh_token=${refresh_token}`,
          {
            headers: {
              Authorization: process.env.TOKEN_BASIC,
              Accept: 'application/x-www-form-urlencode',
            },
          },
        ),
      );
      return rs.data;
    } catch (error) {
      const { status, data } = error.response;
      throw new HttpException(data.errorMessage, status);
    }
  }

  async profile(email) {
    const token = await this.keycloakService.adminToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: 'application/json',
      },
    };
    return await lastValueFrom(
      this.httpService.get(
        `/admin/realms/${process.env.KEYCLOAK_REALM}/users?username=${email}`,
        options,
      ),
    );
  }
}
