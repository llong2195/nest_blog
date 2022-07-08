import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
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
    return this.ActionRepository.save(createAction).catch((err) => {
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
    return this.ActionRepository.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.ActionRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updateActionDto: UpdateActionDto) {
    if (updateActionDto.name) {
      updateActionDto.slug = this.slugify(updateActionDto.name);
    }
    return this.ActionRepository.update(id, updateActionDto).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.ActionRepository.delete({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  slugify(name = '') {
    return slug(name, '_');
  }
}
