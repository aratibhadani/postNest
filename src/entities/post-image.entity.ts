import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({ name: 'postimage' })
export class PostImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => PostEntity, (post) => post.images)
  post: PostEntity;
}
