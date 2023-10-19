import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100, {
    message: 'Name is too long',
  })
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(191, {
    message: 'Email is too long',
  })
  readonly email: string;

  @IsString()
  @MinLength(4, {
    message: 'Password should have at least 4 characters',
  })
  readonly password: string;
}
