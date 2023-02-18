import { IsAlpha, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  type: 'landlord' | 'tenant';
}
