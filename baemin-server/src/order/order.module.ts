import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProductModule } from './order_product/order_product.module';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [OrderProductModule, PrismaClient],
})
export class OrderModule {}
