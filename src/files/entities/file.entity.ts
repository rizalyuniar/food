import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 200 })
    filename: string;

    @Column({ length: 200 })
    basepath: string;

    @Column({ length: 100 })
    mimetype: string;

    @Column({ default: 1 })
    version: number;

    @Column({ length: 100 })
    type: string;

    @Column({ default: 0 })
    usage_status: number;

    @CreateDateColumn()
    created_at: Date;

    @Column({ length: 100 })
    created_by: string;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ length: 100, nullable: true })
    updated_by: string;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @Column({ length: 100, nullable: true })
    deleted_by: string;
}
