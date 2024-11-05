import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProductModule } from './order_product/order_product.module';
import { PrismaClient } from '@prisma/client';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [OrderProductModule, PrismaClient,
    ClientsModule.register([{
      name: "ORDER_NAME",
      transport: Transport.RMQ,
      options: {
        // url kết nối đến server RabbitMQ
        urls: ['amqp://admin:1234@some-rabbit:5672'],
        // tên queue xử lý
        queue: 'order_queue',
        queueOptions: {
          // chế độ lưu trữ:
          // true: save - false not save, khi RabbitMQ
          durable: false
        }
      }
    }]), ClientsModule.register([{
      name: "PRODUCT_NAME",
      transport: Transport.RMQ,
      options: {
        // url kết nối đến server RabbitMQ
        urls: ['amqp://admin:1234@some-rabbit:5672'],
        // tên queue xử lý
        queue: 'product_queue',
        queueOptions: {
          // chế độ lưu trữ:
          // true: save - false not save, khi RabbitMQ
          durable: false
        }
      }
    }])
  ],
})
export class OrderModule { }
