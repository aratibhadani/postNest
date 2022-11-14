import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { PostImageEntity } from './post-image.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  content: string;

  //way 1
  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user: number;

  //way2
  // @ManyToOne(() => UserEntity, (user:UserEntity) => user.posts)
  // @JoinColumn()
  // user: UserEntity;
  // @Column()
  // @RelationId((post: PostEntity) => post.user)
  // user_id: number;

  
}
