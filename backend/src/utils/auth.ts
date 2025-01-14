import Cookies from "cookies";
import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<{ req: any; res: any }> = (
  { root, args, context, info },
  roles
) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");
  if (!token) {
    console.log("Token not found");
    return false;
  }
  try {
    const decode = verify(token, `${process.env.JWT_SECRET_KEY}`);
    console.log("Token is verified =>", decode);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
