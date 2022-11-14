import { HttpStatus, Injectable } from '@nestjs/common';
import { PostImageEntity } from 'src/entities/post-image.entity';
import { PostEntity } from 'src/entities/post.entity';
import { getRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { getConnection } from "typeorm";
import { Connection } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class PostService {
  constructor(private connection: Connection) { }
  createPost(file, body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const postRepo = getRepository(PostEntity);
      const postImageRepo = getRepository(PostImageEntity);
      postRepo.save({
        name: body.name,
        content: body.content,
        user: body.userId
      }).then((postData) => {
        console.log(postData)
        //{ name: 'sdf', content: 'sdf', id: 1 }
        // console.log('postdata0==>', postData)
        // if (!postData) {
        //   return resolve({
        //     message: 'Data not Save..',
        //     error: true
        //   })
        // } else {

        //   file.map((item) => {
        //     console.log(item);
        //     console.log('aaa->',postData);

        //     postImageRepo.save({
        //       image: item.originalname,
        //       postId: 11
        //     }).then((res) => {
        //       console.log('res', res.id)
        //     }).catch((err) => {
        //       console.log('not save this post image', err)
        //     })
        //   })
        //   return resolve({
        //     message: 'Data Save..',
        //     error: false
        //   })
        // }
      }).catch((err) => {
        console.log('error-->', err);
      })
    })
  }

  checkUserId(userId){

  }


  findAllPost(Response) {
    const post_repo = getRepository(PostEntity);
    post_repo.createQueryBuilder('post')
      .leftJoinAndSelect("post.user", "user")
      .select(['post.name','post.content','user.firstName','user.lastName','user.email','user.isActive'])
      .getMany()
      .then((res)=>{
        if(res.length==0){
          return Response.status(HttpStatus.NOT_FOUND).send({
            data: null,
            message: 'Post Data not Found',
          });
        }else{
          return Response.status(HttpStatus.OK).send({
            data: res,
            message: 'Post Data get',
          });
        }
      })
      .catch((err)=>{
        Response.status(500).json({
          data: null,
          message: `Internal server error`,
        });
      })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
