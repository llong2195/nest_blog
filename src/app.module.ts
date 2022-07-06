import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { PermissionModule } from './permission/permission.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { ActionModule } from './action/action.module';
import { RouterModule } from '@nestjs/core';
import { PerActionModule } from './per_action/per_action.module';
import { Permission } from './permission/entities/permission.entity';
import { Action } from './action/entities/action.entity';
import { PerAction } from './per_action/entities/per_action.entity';
import { Tag } from './tag/entities/tag.entity';
import { BlogTagModule } from './blog_tag/blog_tag.module';
import { BlogCatModule } from './blog_cat/blog_cat.module';
import { BlogFileModule } from './blog_file/blog_file.module';
import { Blog } from './blog/entities/blog.entity';
import { BlogCat } from './blog_cat/entities/blog_cat.entity';
import { BlogFile } from './blog_file/entities/blog_file.entity';
import { BlogTag } from './blog_tag/entities/blog_tag.entity';
import { Comment } from './comment/entities/comment.entity';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_blog',
      entities: [
        Action,
        Blog,
        BlogCat,
        BlogFile,
        BlogTag,
        Category,
        Comment,
        PerAction,
        Permission,
        Tag,
        User,
      ],
      synchronize: true,
      autoLoadEntities: true,
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
        path: 'api/v1',
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
export class AppModule {}
