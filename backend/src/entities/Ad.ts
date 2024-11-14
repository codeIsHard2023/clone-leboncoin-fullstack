import { Field, ID, Int, ObjectType } from "type-graphql";
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
  tags!: Tag[];

  @Column({ length: 100 })
  @Length(5, 100, { message: "Entre 5 et 100 caractères" })
  @Field()
  title!: string;

  @Column({ length: 500 })
  @Length(10, 500, { message: "Entre 10 et 500 caractères" })
  @Field(() => String, { nullable: true })
  description!: string;

  @Column()
  @IsEmail()
  @Field()
  owner!: string;

  @Column()
  @Min(0)
  @Max(100000)
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
