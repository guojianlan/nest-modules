import { Controller, Get, Inject, Logger, Scope } from '@nestjs/common';

import { AppService } from './app.service';
import { Redis } from 'ioredis';
import { InjectRedisClient } from './redis/redis-inject';
import { LoggerModule } from './logger/logger.module';
import { MyLogger } from './logger/logger.service';
import { User } from './entities/test';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
@Controller('test')
export class AppTestController {
  // private readonly logger = new MyLogger('t2');
  constructor(
    private readonly appService: AppService,
    private readonly logger: MyLogger,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRedisClient() private readonly redis: Redis,
  ) {
    this.logger.setContext('t2');
  }

  @Get()
  async getHello(): Promise<string> {
    // console.log(this.log.log('123'));
    console.log(await this.user.find());
    this.logger.log('123');
    const a = await this.redis.hgetall('resume:session_user_link');
    console.log(a);
    return this.appService.getHello();
  }
}
