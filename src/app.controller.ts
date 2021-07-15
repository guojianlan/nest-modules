import { Controller, Get, Inject, Logger } from '@nestjs/common';

import { AppService } from './app.service';
import { Redis } from 'ioredis';
import { InjectRedisClient } from './redis/redis-inject';
import { LoggerModule } from './logger/logger.module';
import { MyLogger } from './logger/logger.service';
@Controller()
export class AppController {
  // private readonly logger = new Logger();
  constructor(
    private readonly appService: AppService,
    private logger: MyLogger,
    @InjectRedisClient() private readonly redis: Redis,
  ) {
    this.logger.setContext('t2');
  }

  @Get()
  async getHello(): Promise<string> {
    // console.log(this.log.log('123'));
    this.logger.log('1-te222st23');
    const a = await this.redis.hgetall('resume:session_user_link');
    console.log(a);
    return this.appService.getHello();
  }
}
