import { IAuthPayload, IUser } from "../interface/interfaces";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {  generateAuthorizationToken} from "../services/jwtService";
import { createUser } from "../services/userService";
import envValues from "../config/envConfig";
import HttpStatusCodes from "../utils/HttpStatusCodes";
import passport from "passport";
import { GraphQLError } from "graphql";
import { return404ErrorMessage } from "./errorHandler";


const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return404ErrorMessage(res, validationErrors.array());
    return;
  }

  try {
    const user = await createUser(
      req.body.username,
      req.body.email,
      req.body.password
    );

    if (typeof user === "string") {
      return404ErrorMessage(res, "User was not created: " + user);
      return;
    }



    res.status(HttpStatusCodes.OK).json({ username: user.email });
  } catch (error) {
    next(error);
  }
  return;
};

const signUp = [
  body("email").trim().isEmail(),
  body("username").trim().isLength({ min: 5 }),
  body(
    "password",
    "Password should have at least: eigth characters, one upper case character, one lower case character and one number."
  ).isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minLowercase: 1,
  }),
  registerUser,
];

//TODO: create a middleware or validator to receive username and password
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (error: unknown, user: IUser) => {
    if (error || !user) {
      return404ErrorMessage(res, error ? error : "No User Found");
      return;
    }

    //We create the payload to be encrypted then in the JWT token
    const payload: IAuthPayload = {
      id: user.id,
      username: user.email,
      email: user.email,
    };

    try {

      //generate a signed json web token and return it in the response
      const token = generateAuthorizationToken(payload);

      //assign our jwt to the cookie. If there is no cookie set to true in the env variables file, then you are goin to use: Authorizarion Bearer <Token>
      if (envValues.tokenFromCookie) {
        res.cookie(envValues.jwtCookieName, token, { httpOnly: true });
      }

      res.status(HttpStatusCodes.OK).json({ ...payload, token });
    } catch (error) {
      next(error);
    }

    return;
  })(req, res, next);
};

const verifyAccount =  (req: Request, res: Response) => {
  try {
    
      const jwtTokenFromHeader = req.headers.authorization?.substring(7, req.headers.authorization?.length);
      return jwt.verify(jwtTokenFromHeader?jwtTokenFromHeader:"", envValues.jwtSecretToken);
    

  } catch (error:any) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
};

export { signUp, signIn, verifyAccount };
