import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerActionDto } from './dto/create-per_action.dto';
import { UpdatePerActionDto } from './dto/update-per_action.dto';
import { PerAction } from './entities/per_action.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class PerActionService {
  constructor(
    @InjectRepository(PerAction)
    private PerActionRepository: Repository<PerAction>,
  ) {}
  create(createPerActionDto: CreatePerActionDto) {
    const CreatePerAction = new PerAction();
    CreatePerAction.action_ = createPerActionDto.action_id;
    CreatePerAction.per_ = createPerActionDto.per_id;
    CreatePerAction.table_name = createPerActionDto.table_name;
    return this.PerActionRepository.save(CreatePerAction);
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
    return this.PerActionRepository.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.PerActionRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updatePerActionDto: UpdatePerActionDto) {
    const updatePerAction = new PerAction();
    updatePerAction.action_ = updatePerActionDto.action_id;
    updatePerAction.per_ = updatePerActionDto.per_id;
    updatePerAction.table_name = updatePerActionDto.table_name;
    return this.PerActionRepository.update(id, updatePerAction).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.PerActionRepository.delete({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
