import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogTagDto } from './dto/create-blog_tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog_tag.dto';
import { BlogTag } from './entities/blog_tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogTagService {
  constructor(
    @InjectRepository(BlogTag)
    private BlogTagRepository: Repository<BlogTag>,
  ) {}

  create(createBlogTagDto: CreateBlogTagDto) {
    const createBlogTag = new BlogTag();
    createBlogTag.blog_ = createBlogTagDto.blog_id;
    createBlogTag.tag_ = createBlogTagDto.tag_id;
    return this.BlogTagRepository.save(createBlogTag).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  creates(createBlogTagDto: CreateBlogTagDto[]) {
    const prmSaveBlogCat = [];
    for (const iterator of createBlogTagDto) {
      prmSaveBlogCat.push(this.create(iterator));
    }
    return Promise.all(prmSaveBlogCat).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findAll() {
    return `This action returns all blogTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogTag`;
  }

  update(id: number, updateBlogTagDto: UpdateBlogTagDto) {
    return `This action updates a #${id} blogTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogTag`;
  }
}
