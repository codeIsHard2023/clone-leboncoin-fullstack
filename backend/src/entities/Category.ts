import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { ID, ObjectType, Field } from "type-graphql";

@Entity("category")
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads!: Ad[];

  @Field()
  @Column({ length: 100 })
  @Length(3, 100, { message: "Entre 3 et 100 caractères" })
  name!: string;
}
