import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './interceptor/exception';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { ElasticModule } from './elastic/elastic.module';
@Module({
  imports: [PrismaModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ElasticModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule { }
