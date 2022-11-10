import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
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


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
  updatedAt: Date

  // @AfterInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }
}
