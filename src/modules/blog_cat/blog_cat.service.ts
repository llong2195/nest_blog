import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogCatDto } from './dto/create-blog_cat.dto';
import { UpdateBlogCatDto } from './dto/update-blog_cat.dto';
import { BlogCat } from './entities/blog_cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogCatService {
  constructor(
    @InjectRepository(BlogCat)
    private BlogCatRepository: Repository<BlogCat>,
  ) {}
  create(createBlogCatDto: CreateBlogCatDto) {
    const createBlogCat = new BlogCat();
    createBlogCat.blog_ = createBlogCatDto.blog_id;
    createBlogCat.cat_ = createBlogCatDto.cat_id;
    return this.BlogCatRepository.save(createBlogCat).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  creates(createBlogCatDto: CreateBlogCatDto[]) {
    const prmSaveBlogCat = [];
    for (const iterator of createBlogCatDto) {
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
    return `This action returns all blogCat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogCat`;
  }

  update(id: number, updateBlogCatDto: UpdateBlogCatDto) {
    return `This action updates a #${id} blogCat`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogCat`;
  }
}
