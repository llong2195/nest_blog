import { Injectable } from '@nestjs/common';
import { CreateBlogFileDto } from './dto/create-blog_file.dto';
import { UpdateBlogFileDto } from './dto/update-blog_file.dto';

@Injectable()
export class BlogFileService {
  create(createBlogFileDto: CreateBlogFileDto) {
    return 'This action adds a new blogFile';
  }

  findAll() {
    return `This action returns all blogFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogFile`;
  }

  update(id: number, updateBlogFileDto: UpdateBlogFileDto) {
    return `This action updates a #${id} blogFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogFile`;
  }
}
