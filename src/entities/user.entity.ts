import {
  AfterInsert,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column()
  contactno: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  loginToken: string;

  @Column({ nullable: true })
  forgetToken: string;

  @Column({ default: true })
  isActive: boolean;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   nullable: false,
  //   default: 'NOW()',
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   nullable: false,
  // })
  // updatedAt: Date;

  // @AfterInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }
}
