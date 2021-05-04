<<<<<<< HEAD
import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity('subtitle')
export class Subtitle extends BaseEntity {
=======
import { Entity, PrimaryGeneratedColumn , Column, CreateDateColumn} from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@Entity('subtitle')
export class Subtitle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

>>>>>>> add subtitle module
  //   @ManyToOne(() => Video, (video) => video, { cascade: true })
  //   video: Video;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  language: string;
<<<<<<< HEAD
=======

  @Column({ nullable: false, type: Boolean, default: true })
  @IsBoolean()
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300 })
  updatedBy: string;
>>>>>>> add subtitle module
}
