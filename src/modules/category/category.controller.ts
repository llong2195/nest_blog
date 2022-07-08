import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpStatus } from '@nestjs/common';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      data: await this.categoryService.create(createCategoryDto),
    };
  }

  @Get()
  async findAll(@Query() query) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.categoryService.findAll(query),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.categoryService.findOne(+id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.categoryService.update(+id, updateCategoryDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.categoryService.remove(+id),
    };
  }
}
