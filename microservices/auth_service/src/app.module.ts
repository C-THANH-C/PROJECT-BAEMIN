import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule,
  JwtModule.register({
    global: true,
    secret: "THANH",
    signOptions: { expiresIn: '60d' },
  })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
