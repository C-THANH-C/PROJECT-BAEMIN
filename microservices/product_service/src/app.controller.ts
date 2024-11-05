import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) { }
  @MessagePattern("update_product")
  async updateProduct(@Payload() data) {
    return this.appService.updateProduct(data)
  }


  @MessagePattern("all-products")
  async getAllProduct() {
    return this.appService.getAllProduct()
  }

  @MessagePattern("elastic")
  async getElastic(@Payload() data) {
    return this.appService.getElastic(data)
  }
}
