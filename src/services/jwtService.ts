import { IAuthPayload } from "../interface/interfaces";
import jwt from "jsonwebtoken";
import envValues from "../config/envConfig";
import bcrypt from "bcryptjs";


const passwordCompare = async(password:string,hashPassowrd:string)=>{
  return await bcrypt.compare(
    password,
    hashPassowrd
  );
}

/**
 * Returns the token to be used for routing authorization purposes
 * @param payload Payload to be encripted
 * @returns A JWT token
 */
const generateAuthorizationToken = (payload: IAuthPayload): string => {
  return jwt.sign(payload, envValues.jwtSecretToken, {
    expiresIn: envValues.jwtTokenExpiration,
  });
};

export { passwordCompare,generateAuthorizationToken };
