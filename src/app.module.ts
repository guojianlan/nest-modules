import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/all-exception';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggerModule } from './logger/logger.module';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
const { format } = winston;
const { combine, json, label } = format;
import { RedisModule } from './redis/redis-module';
import { AppTestController } from './app.controller-test';
@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (service: ConfigService) => {
        console.log('123123');
        console.log(service?.get('LOG_PATH') || '12');
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          host: '127.0.0.1',
          port: 6378,
          password: '5201314qv',
        };
      },
      inject: [ConfigService],
    }),
    // RedisModule.forRoot({
    //   host: '127.0.0.1',
    //   // port: 6379,
    // }),
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.development.local.env'],
      // ignoreEnvFile: true,
    }),
    LoggerModule.register([
      {
        id: 't1',
        options: {
          format: combine(label({ label: 't1 one' }), json()),
          transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({
              filename: process.env.LOG_PATH + '/test/1.log',
            }),
          ],
        },
      },
      {
        id: 't2',
        options: {
          format: combine(label({ label: 't2 one' }), json()),
          transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({
              filename: process.env.LOG_PATH + '/mysql/t2.log',
            }),
          ],
        },
      },
    ]),
  ],
  controllers: [AppController, AppTestController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
