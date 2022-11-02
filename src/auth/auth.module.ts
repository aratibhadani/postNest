import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    UserModule, //inject user module in auth
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], //as a dependency register in auth module
  exports: [AuthService],
})
export class AuthModule {}
