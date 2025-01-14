import { Arg, Resolver, Mutation } from "type-graphql";
import { CreateUserInput, User } from "../entities/User";
import { validate } from "class-validator";
import { hash, verify } from "argon2";
import { sign, verify as verifyJWT } from "jsonwebtoken";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User | null> {
    const errors = await validate(data);
    if (errors.length) {
      throw new Error(`Validation error: ${errors}`);
    }

    const newUser = new User();
    try {
      const hashedPassword = await hash(`${data.password}`);
      Object.assign(newUser, data, {
        hashedPassword,
        password: undefined,
      });

      await newUser.save();
      return newUser;
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
    const errors = await validate({ email, password });
    if (errors.length > 0) {
      console.error(errors);
      throw new Error(`Validation error: ${errors}`);
    }

    try {
      const user = await User.findOneBy({ email });
      if (user) {
        if (await verify(user.hashedPassword, password)) {
          const token = sign({ id: user.id }, `${process.env.JWT_SECRET_KEY}`, {
            expiresIn: "10s",
          });
          // test token
          //   try {
          //     verifyJWT(token, `${process.env.JWT_SECRET_KEY}`);
          //     console.log("OK");
          //   } catch {
          //     console.log("KO");
          //   }
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
