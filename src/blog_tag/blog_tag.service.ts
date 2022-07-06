import { Injectable } from '@nestjs/common';
import { CreateBlogTagDto } from './dto/create-blog_tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog_tag.dto';

@Injectable()
export class BlogTagService {
  create(createBlogTagDto: CreateBlogTagDto) {
    return 'This action adds a new blogTag';
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
