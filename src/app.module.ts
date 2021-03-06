import { Module } from '@nestjs/common';
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {HttpErrorFilter} from './shared/http-error.filter';
import {LoggingInterceptor} from './shared/logging.interceptor';
import 'dotenv/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Connection} from 'typeorm';
import {CommentModule} from './comment/comment.module';
import {ArticleModule} from './article/article.module';
import {SharedModule} from './shared/shared.module';
import {RolesGuard} from './shared/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CommentModule, ArticleModule, SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService,
      {
          provide: APP_GUARD,
          useClass: RolesGuard,
      },
      {
        provide: APP_FILTER,
        useClass: HttpErrorFilter,
      },
      {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
      },
  ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
