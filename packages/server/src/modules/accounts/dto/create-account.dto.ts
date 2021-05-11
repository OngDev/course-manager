import {
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';

export class CreateAccountDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    username: string;
    email: string;
    password: string;

}