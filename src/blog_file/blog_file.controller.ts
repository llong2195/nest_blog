import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogFileService } from './blog_file.service';
import { CreateBlogFileDto } from './dto/create-blog_file.dto';
import { UpdateBlogFileDto } from './dto/update-blog_file.dto';

@Controller('blog-file')
export class BlogFileController {
  constructor(private readonly blogFileService: BlogFileService) {}

  @Post()
  create(@Body() createBlogFileDto: CreateBlogFileDto) {
    return this.blogFileService.create(createBlogFileDto);
  }

  @Get()
  findAll() {
    return this.blogFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogFileDto: UpdateBlogFileDto,
  ) {
    return this.blogFileService.update(+id, updateBlogFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogFileService.remove(+id);
  }
}
