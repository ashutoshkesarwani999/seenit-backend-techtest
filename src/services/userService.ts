import { IUser } from "../interface/interfaces";
import envValues from "../config/envConfig";
import bcrypt from "bcryptjs";
import DataJSON from '../../DataFile/Data.json'
import { Attributes } from "../controller/resolverFunctions";
import { randomUUID } from "crypto";
// import User, { IUser } from "../models/user";
const IUserAttributes = new Attributes<IUser>(DataJSON);

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
    //verify the new username is unique
    const existingIUser = IUserAttributes.get({ username: username, email: email })
    console.log(existingIUser)
    // 
    if (existingIUser) {
      throw "The information provided belongs to an existing user."
      return "The information provided belongs to an existing user.";
    }
    const IUserData = {
      id: randomUUID(),
      username: username,
      password: await bcrypt.hash(password, envValues.SaltLength),
      email: email
    }
    const IUserDataPostResponse = IUserAttributes.post('Data', IUserData, { "email": email }) as string;

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
