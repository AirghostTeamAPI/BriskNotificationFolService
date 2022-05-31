import { verify } from "jsonwebtoken";
import { IUser } from "src/types/user";

export async function verifyJwtToken(authorization): Promise<IUser> {
  try {
    const token = authorization.split(" ")[1];

    const decoded = await verify(token as string, process.env.jwtSecret as string);

    return decoded as IUser
  } catch (error) {
    return undefined
  }
};