import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, MissingDeleteDateColumnError } from 'typeorm';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  
  @Column({length: 255, nullable: true})
  email: string;

  @Column({length: 255, nullable: true, select: false})
  password: string;

  @Column()
  name: string;

  @Column({ name: "email_verified", default: true })
  emailVerified: boolean;

  // @CreateDateColumn()
  // @Column({
  //   type: 'datetime',
  //   default: () => 'NOW()',
  // })
  @Column({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
    this.updated_at = new Date();
  }
}