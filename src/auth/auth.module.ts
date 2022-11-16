import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule, //inject user module in auth
  ],
  controllers: [AuthController],
  providers: [AuthService], //as a dependency register in auth module
  exports: [AuthService],
})
export class AuthModule {}
