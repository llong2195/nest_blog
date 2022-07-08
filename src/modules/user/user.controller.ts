import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../config/multer.config';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthenticationGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      data: await this.userService.create(createUserDto),
    };
  }

  @Get()
  async findAll(@Query() query) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.userService.findAll(query),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.userService.findOne(+id),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.userService.update(+id, updateUserDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.userService.remove(+id),
    };
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.userService.uploadAvatar(+id, file),
    };
  }

  @Get('email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}
