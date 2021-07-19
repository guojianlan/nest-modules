import { DynamicModule, Global, Inject, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { createLoggerProvider } from './logger.provider';
import { MyLogger } from './logger.service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {
  constructor(private readonly moduleRef: ModuleRef) {
    console.log('LoggerModule----');
  }
  static register(options): DynamicModule {
    console.log('register');
    const providers = createLoggerProvider(options);
    return {
      
      module: LoggerModule,
      providers: [LoggerModule,...providers],
      exports: [LoggerModule,...providers],
    };
  }
}
