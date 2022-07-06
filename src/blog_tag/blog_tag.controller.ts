import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogTagService } from './blog_tag.service';
import { CreateBlogTagDto } from './dto/create-blog_tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog_tag.dto';

@Controller('blog-tag')
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  @Post()
  create(@Body() createBlogTagDto: CreateBlogTagDto) {
    return this.blogTagService.create(createBlogTagDto);
  }

  @Get()
  findAll() {
    return this.blogTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogTagDto: UpdateBlogTagDto) {
    return this.blogTagService.update(+id, updateBlogTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogTagService.remove(+id);
  }
}
