import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

import * as slug from 'slug';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private TagRepositoty: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const createTag = new Tag();
    createTag.name = createTagDto.name;
    createTag.description = createTagDto.description;
    createTag.isPublished = createTagDto.isPublished;
    if (createTagDto.name) {
      createTag.slug = this.slugify(createTagDto.name);
    }
    return this.TagRepositoty.save(createTag).catch((err) => {
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
    return this.TagRepositoty.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.TagRepositoty.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    const updateTag = new Tag();
    updateTag.name = updateTagDto.name;
    updateTag.description = updateTagDto.description;
    updateTag.isPublished = updateTagDto.isPublished;
    if (updateTagDto.name) updateTag.slug = this.slugify(updateTagDto.name);
    return this.TagRepositoty.update(id, updateTag).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.TagRepositoty.delete({ id: id }).catch((err) => {
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
