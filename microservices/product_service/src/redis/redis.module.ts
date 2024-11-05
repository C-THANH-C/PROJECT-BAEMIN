import { ConfigService, ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from "cache-manager-redis-store"
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get("REDIS_HOST"),
                port: configService.get("REDIS_PORT"),
                auth_pass: configService.get("REDIS_PASS"),
                ttl: configService.get("REDIS_TTL"), // 5s
            }),
            inject: [ConfigService],
            isGlobal: true,
        })
    ],
    exports: [CacheModule]
})
export class RedisModule { }
