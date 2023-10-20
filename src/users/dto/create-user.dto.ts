import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(191)
  email: string;

  @IsString()
  @MinLength(4, {
    message: 'Password should have at least 4 characters',
  })
  password: string;
}
