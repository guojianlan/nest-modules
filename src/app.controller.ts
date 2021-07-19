import { Controller, Get, Inject, Logger, Scope } from '@nestjs/common';

import { AppService } from './app.service';
import { Redis } from 'ioredis';
import { InjectRedisClient } from './redis/redis-inject';
import { LoggerModule } from './logger/logger.module';
import { MyLogger } from './logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/test';
import { Repository } from 'typeorm';
@Controller()
export class AppController {
  // private readonly logger = new MyLogger('t1');
  constructor(
    private readonly appService: AppService,
    private readonly logger: MyLogger,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRedisClient() private readonly redis: Redis,
  ) {
    console.log(1);
    this.logger.setContext('t1');
  }

  @Get()
  async getHello(): Promise<string> {
    // console.log(this.log.log('123'));
    this.logger.log('1-te222st23');
    console.log(await this.user.find())
    const a = await this.redis.hgetall('resume:session_user_link');
    console.log(a);
    return this.appService.getHello();
  }
  @Get('a')
  async getHelloA(): Promise<string> {
    // console.log(this.log.log('123'));
   
    this.logger.log('getHelloA');
    console.log(await this.user.find())
    this.logger.setContext('t2');

    const a = await this.redis.hgetall('resume:session_user_link');
    console.log(a);
    return this.appService.getHello();
  }
}
