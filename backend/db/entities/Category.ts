import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity("category")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads!: Ad[];

  @Column({ length: 100 })
  @Length(3, 100, { message: "Entre 3 et 100 caractères" })
  name!: string;
}
