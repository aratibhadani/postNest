import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({ name: 'postimage' })
export class PostImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false,length:100 })
  image: string;

  @ManyToOne(() => PostEntity, (post) => post.images, {
    nullable: false,
  })
  @JoinColumn({ name: "post_id" })
  post: number;

 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" ,nullable: false,onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
