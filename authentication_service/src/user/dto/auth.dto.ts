import { IsEmail, IsJWT, IsNumber, IsUUID } from 'class-validator';

export class PayloadToken {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsNumber()
  roleId: number;
}

export class RefreshTokenDto {
  @IsJWT()
  refreshToken: string;
}
