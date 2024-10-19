import { Module } from '@nestjs/common';
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
    OrderModule
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
