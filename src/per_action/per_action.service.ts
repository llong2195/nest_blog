import { Injectable } from '@nestjs/common';
import { CreatePerActionDto } from './dto/create-per_action.dto';
import { UpdatePerActionDto } from './dto/update-per_action.dto';

@Injectable()
export class PerActionService {
  create(createPerActionDto: CreatePerActionDto) {
    return 'This action adds a new perAction';
  }

  findAll() {
    return `This action returns all perAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perAction`;
  }

  update(id: number, updatePerActionDto: UpdatePerActionDto) {
    return `This action updates a #${id} perAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} perAction`;
  }
}
