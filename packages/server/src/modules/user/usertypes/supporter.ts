import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../model';

@Entity('Supporters')
export default class Supporter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.supporter)
  user: User;
}
