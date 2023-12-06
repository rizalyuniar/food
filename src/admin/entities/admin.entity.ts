import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Index('admin_unique_constraint', ['id', 'email', 'username'], { unique: true })
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;

    @Column({ length: 100 })
    full_name: string;

    @Column({ length: 100, nullable: true })
    role: string;

    @Column({ nullable: true })
    profile_pict_file_id: string;

    @Column({ type: 'uuid', nullable: true, comment: 'if role = tenant, this is id of tenant. Otherwise, null' })
    tenant_id: string;

    @Column({ default: 0, comment: '1 = active, 0 = not active' })
    status: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'varchar', length: 100 })
    created_by: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ length: 100, nullable: true })
    updated_by: string;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    @Column({ length: 100, nullable: true })
    deleted_by: string;
}
