import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
@Entity({ name: 'account' })
export class UserDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'varchar', length: 300 })
  userAvatarUrl: string;

  @Column({ type: 'varchar', length: 300 })
  userRole: userRole;
}

export enum userRole{
    SUPPORTER = "SUPPORTER",
    MOD = "MOD",
    USERS = "USERS"
}