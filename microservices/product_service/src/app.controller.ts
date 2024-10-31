import { create } from 'domain';
import { Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) { }
  @MessagePattern("update_product")
  updateQuantity(@Payload() data) {
    console.log(data)
    return "a"
  }
  @MessagePattern("update_product")
  async updateProduct(@Payload() data) {
    return this.appService.updateProduct(data)
  }
}
