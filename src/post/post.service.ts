import { HttpStatus, Injectable } from '@nestjs/common';
import { PostImageEntity } from 'src/entities/post-image.entity';
import { PostEntity } from 'src/entities/post.entity';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private connection: Connection) { }

  createPost(file, body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const userCheck = await this.checkUserId(body.userId);
      if (userCheck.length === 0) {
        return resolve({
          message: 'User not Found',
          error: true
        })
      } else {
        const postRepo = getRepository(PostEntity);
        const postImageRepo = getRepository(PostImageEntity);
        postRepo.save({
          name: body.name,
          content: body.content,
          user: body.userId
        }).then((postData) => {
          console.log(postData)
          if (!postData) {
            return resolve({
              message: 'Data not Save..',
              error: true
            })
          } else {

            file.map((item) => {
              postImageRepo.save({
                image: item.originalname,
                post: postData.id
              }).then((res) => {
                console.log('res', res.id)
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
      }

    })
  }

  // return user exists or not in Db
  checkUserId(userId: number) {
    return getRepository(UserEntity).find({ where: { id: userId } });
  }

  //check post id is present or not
  checkPostId(postId: number) {
    return getRepository(PostEntity).find({ where: { id: postId } });
  }

  //get all post of related iamges and joimn user data
  findAllPost(Response) {
    const post_repo = getRepository(PostEntity);
    post_repo.createQueryBuilder('post')
      .leftJoinAndSelect("post.images", "postimage")
      .leftJoinAndSelect("post.user", "user")
      .select(['post.name', 'post.content', 'postimage.image', 'user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
      .getMany()
      .then((res) => {
        if (res.length == 0) {
          return Response.status(HttpStatus.NOT_FOUND).send({
            data: null,
            message: 'Post Data not Found',
          });
        } else {
          return Response.status(HttpStatus.OK).send({
            data: res,
            message: 'Post Data get',
          });
        }
      })
      .catch((err) => {
        Response.status(500).json({
          data: null,
          message: `Internal server error`,
        });
      })
  }

  findOne(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const post_repo = getRepository(PostEntity);
      post_repo.createQueryBuilder('post')
        .leftJoinAndSelect("post.images", "postimage")
        .leftJoinAndSelect("post.user", "user")
        .select(['post.name', 'post.content', 'postimage.image', 'user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
        .getMany()
        .then((res) => {
          if (res.length == 0) {
            return resolve({
              error: true,
              message: 'Post Data not Found',
            });
          } else {
            return resolve({
              data: res,
              error: false,
              message: 'Post Data get',
            });
          }
        })
        .catch((err) => {
          return reject({
            data: null,
            message: `Internal server error`,
          });
        })
    })
  }

  updatePost(id: number, body: CreatePostDto, file): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const postExits = await this.checkPostId(id);
      if (!postExits) {
        return resolve({
          error: true,
          message: 'Post Data not Found',
        });
      } else {
        const postRepo = getRepository(PostEntity);
        //update post data
        postRepo.createQueryBuilder()
          .update(PostEntity)
          .set({ name: body.name, content: body.content })
          .where("id = :id", { id })
          .execute()
          .then((postData) => {
            //update post image data
            if (!postData) {
              return resolve({
                message: 'Data not Save..',
                error: true
              })
            } else {
              const postImageRepo = getRepository(PostImageEntity);

              file.map((item) => {
                postImageRepo.save({
                  image: item.originalname,
                  post: id
                }).then((res) => {

                }).catch((err) => {
                  console.log('not save this post image', err)
                })
              })
              return resolve({
                message: 'Data Save..',
                error: false
              })
            }
          })
          .catch((err) => {
            console.log(err, 'err');

          })
      }
    });
  }

  removePost(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const postExits = await this.checkPostId(id);
      if (postExits.length === 0) {
        return resolve({
          error: false,
          message: 'Post Data not Found',
        });
      } else {
        //find post image that present on post images table and create a array of that
        const postImageRepo = getRepository(PostImageEntity);
        const data = await postImageRepo.createQueryBuilder('post_image')
          .leftJoinAndSelect("post_image.post", "post")
          .select(['post_image.id'])
          .where("post.id = :postid", { postid: id })
          .getMany();

        const dataArr = data.map(object => object.id); //make this array of object data into array bcz in accept only
       //delete record in postimage table
       console.log(dataArr);
       if(dataArr.length==0){
        return resolve({
          error: true,
          message: 'No any PostImage available this post',
        });
       }else{
        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(PostImageEntity)
        .where("id IN (:...id)", { id: dataArr })
        .execute()
        .then(async()=>{
          //delete record in post table
          await getConnection().createQueryBuilder()
          .delete().from(PostEntity)
          .where('id=:id',{id:id})
          .execute();
          return resolve({
            error: false,
            message: 'Post Data Deleted',
          });
        })
        .catch(()=>{
          return resolve({
            error: true,
            message: 'Post Data not Deleted',
          });
        })
       }
       
      }
    });
  }
}
