import { Length, IsEmail, IsStrongPassword } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity("user")
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  hashedPassword!: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: String;

  @Length(10, 100, { message: "Password length" })
  @IsStrongPassword(
    { minLength: 10, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
    {
      message:
        "Password must be at least 10 characters long and include 1 number, 1 uppercase letter, and 1 symbol",
    }
  )
  @Field()
  password!: String;
}
