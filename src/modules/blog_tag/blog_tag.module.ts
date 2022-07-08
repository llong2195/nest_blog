import { Module } from '@nestjs/common';
import { BlogTagService } from './blog_tag.service';
import { BlogTagController } from './blog_tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from './entities/blog_tag.entity';

@Module({
  controllers: [BlogTagController],
  providers: [BlogTagService],
  imports: [TypeOrmModule.forFeature([BlogTag])],
  exports: [BlogTagService],
})
export class BlogTagModule {}
