import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import * as slug from 'slug';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private PermissionRepository: Repository<Permission>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    const createPermission = new Permission();
    createPermission.name = createPermissionDto.name;
    createPermission.description = createPermissionDto.description;
    if (createPermissionDto.name) {
      createPermission.slug = this.slugify(createPermissionDto.name);
    }
    return this.PermissionRepository.save(createPermission).catch((err) => {
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
    return this.PermissionRepository.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.PermissionRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updatePermission = new Permission();
    updatePermission.name = updatePermissionDto.name;
    updatePermission.description = updatePermissionDto.description;
    if (updatePermissionDto.name) {
      updatePermission.slug = this.slugify(updatePermissionDto.name);
    }
    return this.PermissionRepository.update(id, updatePermission).catch(
      (err) => {
        throw new HttpException(
          err.sqlMessage || 'BAD_REQUEST',
          HttpStatus.BAD_REQUEST,
        );
      },
    );
  }

  remove(id: number) {
    return this.PermissionRepository.delete({ id: id }).catch((err) => {
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
