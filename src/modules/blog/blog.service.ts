import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Like, Repository } from 'typeorm';
import * as slug from 'slug';
import { CreateBlogCatDto } from '../blog_cat/dto/create-blog_cat.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private BlogRepository: Repository<Blog>,
  ) {}
  create(createBlogDto: CreateBlogDto) {
    const createBlog = new Blog();
    createBlog.title = createBlogDto.title;
    createBlog.content = createBlogDto.content;
    createBlog.isPublished = createBlogDto.isPublished || false;
    createBlog.user_ = createBlogDto.user_id;
    if (createBlogDto.title) {
      createBlog.slug = this.slugify(createBlogDto.title);
    }
    return this.BlogRepository.save(createBlog).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
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

    return this.BlogRepository.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.BlogRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    const updateBlog = new Blog();
    updateBlog.title = updateBlogDto.title;
    updateBlog.content = updateBlogDto.content;
    updateBlog.isPublished = updateBlogDto.isPublished || false;
    updateBlog.user_ = updateBlogDto.user_id;
    if (updateBlogDto.title) {
      updateBlog.slug = this.slugify(updateBlogDto.title);
    }
    return this.BlogRepository.update(id, updateBlogDto).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.BlogRepository.delete(id).catch((err) => {
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
