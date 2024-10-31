import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern("get-all-order")
  getAllOrder() {
    return this.appService.getAllOrder()
  }

  @MessagePattern("post-order")
  async postOrder(@Payload() data: any) {
    return this.appService.postOrder(data)
  }

  @MessagePattern("update-order")
  async updateOrder(@Payload() data) {
    return this.appService.updateOrder(data)
  }
}
