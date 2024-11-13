import { Length } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Ad } from "./Ad";

@Entity("tag")
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToMany(() => Ad, (ad) => ad.tags)
    ads!: Ad[];

    @Column({ length: 100 })
    @Length(3, 100, {message: "Entre 3 et 100 caractères"})
    name!: string;
}