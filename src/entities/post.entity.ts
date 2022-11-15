import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { PostImageEntity } from './post-image.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: number;

  @OneToMany(() => PostImageEntity, (images) => images.post)
  images: PostImageEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" ,nullable: false,onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
