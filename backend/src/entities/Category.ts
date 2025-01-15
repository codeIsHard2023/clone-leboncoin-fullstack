import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { ID, ObjectType, Field, InputType } from "type-graphql";
import { User } from "./User";

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

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  createdBy!: User;
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
