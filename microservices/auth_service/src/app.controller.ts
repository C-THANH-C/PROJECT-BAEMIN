import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern("get-all-user")
  async getAllUser() {
    return this.appService.getAllUser();
  }

  @MessagePattern("post-login")
  async login(@Payload() data) {
    return this.appService.login(data)
  }

  @MessagePattern("sign-up")
  async signUp(@Payload() data) {
    return this.appService.signUp(data)
  }

}
