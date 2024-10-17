import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProductModule } from './order_product/order_product.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [OrderProductModule],
})
export class OrderModule {}
