import { Module } from '@nestjs/common';
import { BlogCatService } from './blog_cat.service';
import { BlogCatController } from './blog_cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCat } from './entities/blog_cat.entity';

@Module({
  controllers: [BlogCatController],
  providers: [BlogCatService],
  imports: [TypeOrmModule.forFeature([BlogCat])],
})
export class BlogCatModule {}
