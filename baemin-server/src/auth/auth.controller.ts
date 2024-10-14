import { LoginDto, PatchDto, SignUpDto } from './dto/index.dto';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/authGuard/auth.guard';

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
  // @UseGuards(AuthGuard)
  @Patch("/patch-user/:id")
  patchUser(@Param("id") id: number, @Body() body: PatchDto,) {
    return this.authService.patchUser(+id, body)
  }
}
