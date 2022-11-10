import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticalEntity } from './artical.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'articalimage' })
export class ArticalImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => ArticalEntity, (artical) => artical.images)
  artical: ArticalEntity;
}
