import { Arg, Resolver, Mutation, Ctx, Query, Authorized } from "type-graphql";
import { CreateUserInput, User } from "../entities/User";
import { validate } from "class-validator";
import { hash, verify } from "argon2";
import { sign, verify as jwtVerify, decode } from "jsonwebtoken";
import Cookies from "cookies";

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
    @Arg("password") password: string,
    @Ctx() context: { req: any; res: any }
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
            expiresIn: "72h",
          });
          const { req, res } = context;
          const cookies = new Cookies(req, res);
          cookies.set("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
          });
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

  @Query(() => User, { nullable: true })
  @Authorized()
  async whoAmI(@Ctx() context: { req: any; res: any }) {
    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get("token");
    const payload = decode(`${token}`) as unknown as { id: number };
    const user = await User.findOneBy({
      id: payload.id,
    });
    return user;
  }
}
