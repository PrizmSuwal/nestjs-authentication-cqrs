import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        nullable: true,
        unique: false
    })
    name!: string;

    @Column({
        nullable: true,
        unique: true
    })
    email!: string;

    @Column({
        nullable: true
    })
    password!: string;
}