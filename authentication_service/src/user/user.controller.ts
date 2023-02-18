import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from 'nest-keycloak-connect';
import { RefreshTokenDto } from './dto/auth.dto';
import { CheckPermissions } from './authentication_service.decorator';
import { PermissionAction } from './casl-ability.factory';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Public()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('register')
  @Public()
  register(@Body() createUserDto: CreateUserDto) {
    this.userService.register(createUserDto);
  }

  @Post('refresh')
  @Public()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @Public()
  logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.logout(refreshTokenDto.refreshToken);
  }

  @Get('home')
  @CheckPermissions([PermissionAction.READ, 'home'])
  test() {
    return 'home';
  }

  // Example For AuthorizationGuard
  // @Get('profile/:uid')
  // @UseGuards(AuthorizationGuard)
  // @CheckPermissions([PermissionAction.CREATE, 'Home'])
  // getProfile(@Param('uid') uid: string, @Req() req: Request) {
  //   const record = new RmqRecordBuilder(uid).setOptions({
  //     headers: {
  //       ['access-token']: req.cookies['access-token'],
  //     },
  //   });
  //   const rsReadProfile = this.authClient.send<any>('auth_profile', record);
  //   return rsReadProfile;
  // }
}
