import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticalEntity } from './artical.entity';

@Entity({ name: 'articalimage' })
export class ArticalImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => ArticalEntity, (artical) => artical.images)
  @JoinColumn({ name: "artical_id" })
  artical: number;
}

