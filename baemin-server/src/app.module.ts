import { Module, UseFilters } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { StoreModule } from './store/store.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authGuard/jwt.strategy';
import { ShipModule } from './ship/ship.module';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpExceptionFilter } from './interceptor/exception';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AbstractHttpAdapter, APP_FILTER } from '@nestjs/core';
@UseFilters(HttpExceptionFilter)
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    StoreModule,
    JwtModule.register({
      global: true,
      secret: "THANH"
    }),
    ShipModule,
    OrderModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }],
})
export class AppModule { }
