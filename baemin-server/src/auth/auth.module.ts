import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [JwtModule.register({

  }),
  ClientsModule.register([{
    name: "AUTH_NAME",
    transport: Transport.RMQ,
    options: {
      // url kết nối đến server RabbitMQ
      urls: ['amqp://admin:1234@some-rabbit:5672'],
      // tên queue xử lý
      queue: 'auth_queue',
      queueOptions: {
        // chế độ lưu trữ:
        // true: save - false not save, khi RabbitMQ
        durable: false
      }
    }
  }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
