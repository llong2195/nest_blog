import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository, Like } from 'typeorm';
import * as slug from 'slug';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const createCategory = new Category();
    createCategory.name = createCategoryDto.name;
    createCategory.description = createCategoryDto.description;
    createCategory.isPublished = createCategoryDto.isPublished;
    createCategory.parent_id = createCategoryDto.parent_id || 0;
    if (createCategoryDto.name) {
      createCategory.slug = this.slugify(createCategoryDto.name);
    }
    return this.CategoryRepository.save(createCategory).catch((err) => {
      throw new HttpException(err.sqlMessage, HttpStatus.BAD_REQUEST);
    });
  }

  findAll(query: any) {
    const option = {};
    if ('page' in query) {
      const page = parseInt(query.page) || 1;
      const limit = 5;
      const skip = limit * (page - 1);
      option['skip'] = skip;
      option['take'] = limit;
    }
    if ('name' in query) {
      option['where'] = {
        name: Like(`%${query.name}%`),
      };
    }
    return this.CategoryRepository.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.CategoryRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = new Category();
    updateCategory.name = updateCategoryDto.name;
    updateCategory.description = updateCategoryDto.description;
    updateCategory.isPublished = updateCategoryDto.isPublished;
    if (updateCategoryDto.name) {
      updateCategory.slug = this.slugify(updateCategoryDto.name);
    }
    return this.CategoryRepository.update(id, updateCategory).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.CategoryRepository.delete({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  slugify(data = '') {
    return slug(data, '_');
  }
}
