import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [ClientsModule.register([{
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
  }])],
})
export class ProductModule { }
