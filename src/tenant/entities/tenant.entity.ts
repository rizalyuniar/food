import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar", length: 150})
    name_store: string;

    @Column({type: 'varchar'})
    status: string;
}