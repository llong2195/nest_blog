import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../utils/hash';
import { JWT_EXPIRES_TIME } from 'src/config/jwt.config';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { LoginAuthDto } from './dto/auth.dto';
import { PermissionService } from '../modules/permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    console.log(user);

    if (!user) {
      return false;
    }
    const check = Hash.compare(password, user.password);

    if (!user || !check) {
      return false;
    }
    return user;
  }

  async login(user: any) {
    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
      roles: [],
      action: [],
    };
    if (user.password) {
      delete user.password;
    }
    return {
      expiresIn: JWT_EXPIRES_TIME,
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
