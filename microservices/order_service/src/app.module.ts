import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule, ClientsModule.register([{
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
