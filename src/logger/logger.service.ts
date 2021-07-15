import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
export class MyLogger implements LoggerService {
  context: string;
  log(message: string) {
    /* your implementation */

    winston.loggers.get(this.context).info(message);
  }
  error(message: string, trace: string) {
    /* your implementation */
    winston.loggers.get('t2').error(message);
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
  setContext(context) {
    this.context = context;
  }
}
