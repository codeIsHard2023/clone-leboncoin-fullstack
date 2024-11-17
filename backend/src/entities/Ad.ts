import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { IsEmail, IsUrl, Length, Max, Min } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { IdInput } from "./Id";

@Entity("ad")
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];

  @Column({ length: 100 })
  @Length(5, 100, { message: "Entre 5 et 100 caractères" })
  @Field()
  title!: string;

  @Column({ nullable: true })
  //   @Length(10, 500, { message: "Entre 10 et 500 caractères" })
  @Field(() => String, { nullable: true })
  description!: string;

  @Column()
  @IsEmail()
  @Field()
  owner!: string;

  @Column()
  @Min(0)
  @Max(10000000)
  @Field(() => Int)
  price!: number;

  @Column()
  @IsUrl()
  @Field()
  picture!: string;

  @Column({ length: 110 })
  @Length(2, 110, { message: "Entre 2 et 110 caractères" })
  @Field()
  location!: string;

  @Column()
  @Field()
  createdAt!: Date;

  @BeforeInsert()
  private setCreatedAt() {
    this.createdAt = new Date();
  }
}

@InputType()
export class AdCreateInput {
  @Field(() => IdInput)
  category!: IdInput;

  @Field(() => [IdInput], { nullable: true })
  tags!: IdInput[];

  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string;

  @Field()
  owner!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  picture!: string;

  @Field()
  location!: string;
}

@InputType()
export class AdUpdateInput {
  @Field(() => IdInput, { nullable: true })
  category!: IdInput;

  @Field(() => [IdInput], { nullable: true })
  tags!: IdInput[];

  @Field({ nullable: true })
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string;

  @Field({ nullable: true })
  owner!: string;

  @Field(() => Int, { nullable: true })
  price!: number;

  @Field({ nullable: true })
  picture!: string;

  @Field({ nullable: true })
  location!: string;
}
