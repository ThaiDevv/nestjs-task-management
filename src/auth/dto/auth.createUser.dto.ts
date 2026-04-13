import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  @MaxLength(16)
  @MinLength(8)
  username!: string;

  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|\W)).{8,}$/, {
    message: 'the password is weak',
  })
  password!: string;
}
