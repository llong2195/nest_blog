import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRES_TIME, JWT_SECRET_KEY } from 'src/config/jwt.config';
import { LocalStrategy } from './strategies/local.strategy';
import { JsonWebTokenStrategy } from './strategies/jwt-strategy';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JsonWebTokenStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRES_TIME },
    }),
  ],
})
export class AuthModule {}
