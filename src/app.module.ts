import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ArticalModule } from './artical/artical.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { PostEntity } from './entities/post.entity';
import { PostImageEntity } from './entities/post-image.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [UserEntity, PostEntity, PostImageEntity],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    PostModule,
    // ArticalModule,
    //must be implement every module in app module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
