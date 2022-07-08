import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActionModule } from './modules/action/action.module';
import { BlogModule } from './modules/blog/blog.module';
import { BlogCatModule } from './modules/blog_cat/blog_cat.module';
import { BlogFileModule } from './modules/blog_file/blog_file.module';
import { BlogTagModule } from './modules/blog_tag/blog_tag.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { PerActionModule } from './modules/per_action/per_action.module';
import { PermissionModule } from './modules/permission/permission.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/Logger.Middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: true,
          autoLoadEntities: true,
          entities: [__dirname + './**/**/**.entity{.ts,.js}'],
        };
      },
    }),
    ActionModule,
    BlogModule,
    BlogCatModule,
    BlogFileModule,
    BlogTagModule,
    CategoryModule,
    CommentModule,
    PerActionModule,
    PermissionModule,
    TagModule,
    UserModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'v1',
        children: [
          {
            path: '/',
            module: ActionModule,
          },
          {
            path: '/',
            module: BlogModule,
          },
          {
            path: '/',
            module: BlogCatModule,
          },
          {
            path: '/',
            module: BlogFileModule,
          },
          {
            path: '/',
            module: BlogTagModule,
          },
          {
            path: '/',
            module: CategoryModule,
          },
          {
            path: '/',
            module: CommentModule,
          },
          {
            path: '/',
            module: PerActionModule,
          },
          {
            path: '/',
            module: PermissionModule,
          },
          {
            path: '/',
            module: TagModule,
          },
          {
            path: '/',
            module: UserModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
