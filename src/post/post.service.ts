import { Injectable } from '@nestjs/common';
import { PostImageEntity } from 'src/entities/post-image.entity';
import { PostEntity } from 'src/entities/post.entity';
import { getRepository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  createPost(file, body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const postRepo = getRepository(PostEntity);
      const postImageRepo = getRepository(PostImageEntity);
      postRepo.save({
        name: body.name,
        content: body.content
      }).then((postData) => {
        //{ name: 'sdf', content: 'sdf', id: 1 }
        console.log('postdata0==>', postData)
        if (!postData) {
          return resolve({
            message: 'Data not Save..',
            error: true
          })
        } else {

          file.map((item) => {
            postImageRepo.save({
              image: item.originalname,
              postId: postData.id
            }).then((res) => {
              console.log('res', res)
            }).catch((err) => {
              console.log('not save this post image', err)
            })
          })
          return resolve({
            message: 'Data Save..',
            error: false
          })
        }
      }).catch((err) => {
        console.log('error-->', err);
      })
    })
  }

  findAllPost(response):Promise<unknown> {
    const post_repo = getRepository(PostEntity);
    return new Promise(async (resolve, reject) => {
      return post_repo.createQueryBuilder('post')
      .leftJoinAndSelect("post.images", "roles")
      .getMany(); 
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
