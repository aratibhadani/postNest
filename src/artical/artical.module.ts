import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ArticalController } from './artical.controller';
import { ArticalService } from './artical.service';

@Module({
  imports:[UserModule],
  controllers: [ArticalController],
  providers: [ArticalService]
})
export class ArticalModule {}
