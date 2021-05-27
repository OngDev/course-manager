import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../model';

@Entity('Admins')
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.admin)
  user: User;
}
