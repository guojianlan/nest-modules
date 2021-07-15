import { Provider } from '@nestjs/common';
import * as winston from 'winston';
import { LoggerOptions } from 'winston';
import { MyLogger } from './logger.service';
export interface MyLoggerOptions {
  id: string;
  options?: LoggerOptions;
}
const { format } = winston;
// const { combine, label, json } = format;
export function initLoggerService(options: MyLoggerOptions[]) {
  console.log('initLoggerService');
  options.forEach((item) => {
    winston.loggers.add(item.id, item.options);
  });
}
export function createLoggerProvider(options: MyLoggerOptions[]): Provider[] {
  initLoggerService(options);
  return [
    {
      provide: 'TEST_LOG',
      useFactory: () => {
        console.log('useFactory register -- logger');
        return new MyLogger();
      },
    },
  ];
}
