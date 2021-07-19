import { Injectable, LoggerService ,Scope } from '@nestjs/common';
import * as winston from 'winston';
let x = 0;

export class MyLogger {
  context: string;
  constructor(context?: string) {
   
    console.log('MyLogger init constructor --test' + ++x);
    if (context) {
      this.context = context;
    }
  }
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
