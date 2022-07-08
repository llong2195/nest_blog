import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { Hash } from 'src/utils/hash';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticationGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async registerUser(@Body() input: CreateUserDto) {
    const check = await this.validate(input.email);
    if (!check) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    input.password = Hash.make(input.password);
    return this.userService.create(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthenticationGuard)
  @Get('current-user')
  async getUserLoggedIn(@Request() request) {
    return this.userService.findOne(request.user.id);
  }

  async validate(email: string) {
    try {
      const users = await this.userService.getUserByEmail(email);
      return users.id > 0;
    } catch (e) {
      return false;
    }
  }
}
