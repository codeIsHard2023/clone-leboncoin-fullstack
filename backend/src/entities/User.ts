import { Length, IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity("user")
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  @Field()
  email!: string;

  @Column()
  //   @Field()
  hashedPassword!: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: String;

  @Length(10, 100, { message: "Password length" })
  //   @IsStrongPassword()
  @Field()
  password!: String;
}
