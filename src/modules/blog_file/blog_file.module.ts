import { Module } from '@nestjs/common';
import { BlogFileService } from './blog_file.service';
import { BlogFileController } from './blog_file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogFile } from './entities/blog_file.entity';

@Module({
  controllers: [BlogFileController],
  providers: [BlogFileService],
  imports: [TypeOrmModule.forFeature([BlogFile])],
})
export class BlogFileModule {}
