import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@Entity("tag")
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[];

  @Column({ length: 100 })
  @Length(3, 100, { message: "Entre 3 et 100 caractères" })
  @Field()
  name!: string;
}
