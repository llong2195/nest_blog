import { Injectable, HttpException, HttpStatus, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { Hash } from '../../utils/hash';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const createUser = new User();
    createUser.name = createUserDto.name;
    createUser.email = createUserDto.email;
    createUser.password = Hash.make(createUserDto.password);
    createUser.phonenumber = createUserDto.phonenumber;
    createUser.gender = createUserDto.gender;
    createUser.per_ = createUserDto.per_id;
    return this.UserRepository.save(createUser).catch((err) => {
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
    return this.UserRepository.find(option).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.UserRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = Hash.make(updateUserDto.password);
    }
    return this.UserRepository.update(id, updateUserDto).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.UserRepository.delete({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
  async uploadAvatar(id: number, file: Express.Multer.File) {
    const user = await this.UserRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.OK);
    } else {
      user.avatarUri = '/public/user/' + file.filename;
      fs.renameSync(file.path, path.resolve('src/public/user', file.filename));
      return this.UserRepository.save(user);
    }
  }

  async getUserByEmail(email: string) {
    // let data = await this.UserRepository.findOne({
    //   where: { email: email },
    //   relations: { per_: true },
    // });
    // if (data.id) {
    // await this.UserRepository.manager.connection
    // }
    // return data;
    return await this.UserRepository.findOneBy({ email: email }).catch(
      (err) => {
        throw new HttpException(
          err.sqlMessage || 'BAD_REQUEST',
          HttpStatus.BAD_REQUEST,
        );
      },
    );
  }
}
