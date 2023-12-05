import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MenuGroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ length: 200 })
    description: string;
  
    @Column({ default: 0 })
    sequence: number;
  
    @Column({ default: 0 })
    status: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    created_by: string;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column({ nullable: true })
    updated_by: string | null;
  
    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;
  
    @Column({ nullable: true })
    deleted_by: string | null;
}
