import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Translate {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({type: "text"})
    text: string;
}
