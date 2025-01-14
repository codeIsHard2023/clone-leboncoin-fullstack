import { Arg, Resolver, Mutation } from "type-graphql";
import { CreateUserInput, User } from "../entities/User";
import { validate } from "class-validator";
import { hash, verify } from "argon2";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User | null> {
    const newUser = new User();

    try {
      const hashedPassword = await hash(`${data.password}`);
      Object.assign(newUser, data, {
        hashedPassword,
        password: undefined,
      });
      const errors = await validate(newUser);
      if (errors.length) {
        throw new Error(`Account validation failed: ${errors}`);
      } else {
        await newUser.save();
        return newUser;
      }
    } catch (err) {
      console.log(err);
      throw new Error(`Unable to create account: Error ${err}`);
    }
  }
  @Mutation(() => User, { nullable: true })
  async signin(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    try {
      const user = await User.findOneBy({ email });
      if (user) {
        if (await verify(user.hashedPassword, password)) {
          return user;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw new Error(`Signin failed ${err}`);
    }
  }
}
