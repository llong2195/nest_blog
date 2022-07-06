import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Repository, Like } from 'typeorm';
import { Action } from './entities/action.entity';
import * as slug from 'slug';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action) private ActionRepository: Repository<Action>,
  ) {}
  create(createActionDto: CreateActionDto): Promise<Action> {
    const createAction = new Action();
    createAction.name = createActionDto.name;
    createAction.slug = this.slugify(createActionDto.name);
    return this.ActionRepository.save(createAction);
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
    return this.ActionRepository.find(option);
  }

  findOne(id: number) {
    return this.ActionRepository.findOneBy({ id: id });
  }

  update(id: number, updateActionDto: UpdateActionDto) {
    const updateAction = new Action();
    updateAction.name = updateActionDto.name;
    if (updateActionDto.name) {
      updateAction.slug = this.slugify(updateActionDto.name);
    }
    return this.ActionRepository.update(id, updateAction);
  }

  remove(id: number) {
    return this.ActionRepository.delete({ id: id });
  }

  slugify(name = '') {
    return slug(name, '_');
  }
}
