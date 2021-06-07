import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';

// FIXME: Update this base on our ERD
export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300, default: 'system' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300, default: 'system' })
  updatedBy: string;
}
