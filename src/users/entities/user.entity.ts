import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;   

    @Column()
    email: string;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    full_name: string;
    
    @Column()
    role: string;

    @Column()
    profile_pict_file_id: string

    @Column()
    verifiction_code: string

    @Column()
    auth_provider: string

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    created_by: Date

    @CreateDateColumn()
    updated_by: Date
    
    @CreateDateColumn()
    updated_at: Date
    
    @CreateDateColumn()
    deleted_at: Date
    
    @CreateDateColumn()
    deleted_by: Date

}
