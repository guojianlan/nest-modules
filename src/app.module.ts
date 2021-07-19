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
import { User } from './entities/test';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions as TypeOrmLoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Logger } from '@nestjs/common';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { MyLogger } from './logger/logger.service';
class OrmLogger implements TypeOrmLogger {
  constructor(logger) {
    // this.logger = logger;
    console.log('1231231');
  }
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log(query, 123);
    // this.logger.setContext('t2');
    // this.logger.log(query);
  }
  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    console.log(error, 123);
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {}
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {}
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner) {}
  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ) {}
}
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService, ) => {
        console.log(config);

        return {
          type: 'mysql',
          port: +'3306',
          host: 'localhost',
          username: 'root',
          password: '123456',
          database: 'cv',
          entities: [User],
          // logger: new OrmLogger(logger),
        };
      },
      inject: [ConfigService, ],
    }),
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
    TypeOrmModule.forFeature([User]),
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
