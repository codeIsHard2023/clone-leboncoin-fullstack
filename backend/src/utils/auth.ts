import Cookies from "cookies";
import { decode } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { User } from "../entities/User";

export type ContextType = { req: any; res: any; user: User | null | undefined };

export const getUserAuth = async (
  context: ContextType
): Promise<User | null> => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    console.log("Token not found");
    return null;
  }

  try {
    const payload = decode(`${token}`) as unknown as { id: number };
    console.log("Token is verified =>", payload);
    const user = await User.findOneBy({
      id: payload.id,
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const authChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles
) => {
  const user = await getUserAuth(context);
  context.user = user;
  return !!user;
};
