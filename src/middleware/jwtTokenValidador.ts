import passport from "passport";
import config from "../config/envConfig";
import { verify} from 'jsonwebtoken'

const getJwtTokenValidador = () => {
  return passport.authenticate("jwt", { session: false }
    )
};

export { getJwtTokenValidador };




export const getUser = (token:string|undefined) => {
  if (token) {
      try {
          // return the user information from the token
          return verify(token, config.jwtSecretToken);
          
          
      } catch (err) {
          // if there's a problem with the token, throw an error
          throw err;
      }
  }
};  