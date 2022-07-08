import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { HttpStatus } from '@nestjs/common';
import { Blog } from './entities/blog.entity';
import { AuthenticationGuard } from '../../auth/guards/auth.guard';
import { BlogTagService } from '../blog_tag/blog_tag.service';
import { BlogCatService } from '../blog_cat/blog_cat.service';
import { CreateBlogCatDto } from '../blog_cat/dto/create-blog_cat.dto';
import { CreateBlogTagDto } from '../blog_tag/dto/create-blog_tag.dto';

@ApiBearerAuth()
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private BlogTagService: BlogTagService,
    private BlogCatService: BlogCatService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  @ApiOperation({ summary: 'Create Blog' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'CREATED.',
    type: Blog,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async create(@Request() req: any, @Body() createBlogDto: CreateBlogDto) {
    createBlogDto.user_id = req.user.id;
    const blog = await this.blogService.create(createBlogDto);
    console.log(createBlogDto);
    let categories = null;
    let tags = null;
    if (createBlogDto.tag_id.length > 0) {
      const lstCreateBlogCat: CreateBlogCatDto[] = [];
      for (const tag_id of createBlogDto.tag_id) {
        const createBlogTag = new CreateBlogCatDto();
        createBlogTag.blog_id = blog.id;
        createBlogTag.cat_id = tag_id;
        lstCreateBlogCat.push(createBlogTag);
      }
      categories = await this.BlogCatService.creates(lstCreateBlogCat);
    }
    if (createBlogDto.category_id.length > 0) {
      const lstCreateBlogTag: CreateBlogTagDto[] = [];
      for (const tag_id of createBlogDto.tag_id) {
        const createBlogTag = new CreateBlogTagDto();
        createBlogTag.blog_id = blog.id;
        createBlogTag.tag_id = tag_id;
        lstCreateBlogTag.push(createBlogTag);
      }
      tags = await this.BlogTagService.creates(lstCreateBlogTag);
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      data: { blog, categories: categories || null, tags: tags || null },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Create Blog' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK.',
    type: Blog,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async findAll(@Query() query: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.blogService.findAll(query),
    };
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK.',
    type: Blog,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.blogService.findOne(+id),
    };
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.blogService.update(+id, updateBlogDto),
    };
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.blogService.remove(+id),
    };
  }
}
