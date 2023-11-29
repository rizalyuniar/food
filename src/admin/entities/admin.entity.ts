import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 150})
    username: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar', length: 25 })
    role: string;

    // unique: true
    @Column({type: 'varchar', length: 150})
    email: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    // @UpdateDateColumn()
    @Column({type:'varchar', length: 25})
    created_by: string
}
