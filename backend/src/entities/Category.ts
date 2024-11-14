import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { ID, ObjectType, Field, InputType } from "type-graphql";

@Entity("category")
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads!: Ad[];

  @Column({ length: 100 })
  @Length(3, 100, { message: "Entre 3 et 100 caractères" })
  @Field()
  name!: string;
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name!: String;
}

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  name!: String;
}
