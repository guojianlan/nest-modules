import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:false});
  app.useLogger(new MyLogger('t1'));
  await app.listen(5001);
}
bootstrap();
