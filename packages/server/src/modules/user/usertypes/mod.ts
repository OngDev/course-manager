import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../model';

@Entity('Mods')
export default class Mod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.mod)
  user: User;
}
