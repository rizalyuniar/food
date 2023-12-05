import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar", length: 100})
    name: string;

    @Column({type: "varchar", length: 10})
    initial: string;

    @Column({ length: 200 })
    description: string;

    @Column({type: "varchar", length: 36})
    profile_pict_file_id: string;

    @Column({type: "varchar", length: 100})
    type: string;

    @Column({ type: 'int', default: 0, comment: '1 = active, 0 = not active' })
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @Column({ length: 100 })
    created_by: string;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ length: 100 })
    updated_by: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column({ length: 100 })
    deleted_by: string;
}