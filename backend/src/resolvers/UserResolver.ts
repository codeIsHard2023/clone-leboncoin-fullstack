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
      data.password = "";

      Object.assign(newUser, data, { hashedPassword });
      const errors = await validate(newUser);
      if (errors.length) {
        return null;
      } else {
        await newUser.save();
        return newUser;
      }
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
}
