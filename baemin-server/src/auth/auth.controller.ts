import { LoginDto, SignUpDto } from './dto/index.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post("/sign-up")
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto)
  }
}
