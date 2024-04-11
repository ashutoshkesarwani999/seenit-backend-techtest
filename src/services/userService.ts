import { IUser } from "../interface/interfaces";
import envValues from "../config/envConfig";
import bcrypt from "bcryptjs";
import DataJSON from '../../DataFile/Data.json'
import { Attributes } from "../controller/resolverFunctions";
import { randomUUID } from "crypto";
// import User, { IUser } from "../models/user";

/**
 * Registers a new user.
 * @param password Non-encrypted password
 * @returns A Promise that resolves in the recently created object or a string with the error message.
 */
const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser | string> => {
  try {
    let IUserAttributes = new Attributes<IUser>(DataJSON);
    console.log("instance value is ",IUserAttributes)

    //verify the new username is unique
    const existingIUser = IUserAttributes.get(DataJSON,{ username: username, email: email })
    // 
    if (existingIUser.length > 0) {
      // throw "The information provided belongs to an existing user."
      return "The information provided belongs to an existing user.";
    }
    const IUserData = {
      id: randomUUID(),
      username: username,
      password: await bcrypt.hash(password, envValues.SaltLength),
      email: email
    }
    console.log("instance value is ",IUserAttributes)

    const IUserDataPostResponse = IUserAttributes.post(DataJSON,'Data', IUserData, { "email": email }) as string;

    // const user = new User({
    //   username,
    //   password: await bcrypt.hash(password, envValues.SaltLength),
    //   email,
    // });
    if (typeof IUserDataPostResponse === "string") {
      return IUserData
    }
    return IUserDataPostResponse as string;
  } catch (error) {
    throw new Error("Error when creating a user: " + error);
  }
};

export { createUser };
