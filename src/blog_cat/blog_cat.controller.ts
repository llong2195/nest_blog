import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogCatService } from './blog_cat.service';
import { CreateBlogCatDto } from './dto/create-blog_cat.dto';
import { UpdateBlogCatDto } from './dto/update-blog_cat.dto';

@Controller('blog-cat')
export class BlogCatController {
  constructor(private readonly blogCatService: BlogCatService) {}

  @Post()
  create(@Body() createBlogCatDto: CreateBlogCatDto) {
    return this.blogCatService.create(createBlogCatDto);
  }

  @Get()
  findAll() {
    return this.blogCatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogCatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogCatDto: UpdateBlogCatDto) {
    return this.blogCatService.update(+id, updateBlogCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogCatService.remove(+id);
  }
}
