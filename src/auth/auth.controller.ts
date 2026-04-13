import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/auth.createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signup')
  async signup(@Body() createUserDto: createUserDto): Promise<void> {
    return this.AuthService.signup(createUserDto);
  }
  @Post('/login')
  async login(@Body() createUserDto: createUserDto): Promise<{ accessToken: string }> {
    return this.AuthService.login(createUserDto);
  }
}
