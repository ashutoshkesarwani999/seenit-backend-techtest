import { signIn, signUp } from "../controller/authControllers";
import { Router } from "express";
import numberOfCallsLimiter from "../middleware/numberOfCallsLimiter";
import speedOfCallsLimiter from "../middleware/speedOfCallsLimiter";

const getAuthRouter = () => {
  const router = Router();

  //We protect the SignUp method to be called many times
  router.post("/signup", numberOfCallsLimiter, speedOfCallsLimiter, signUp);

  router.post("/signin", signIn);

  // router.get("/emailconfirmation/:token", verifyAccount);

  return router;
};

export { getAuthRouter };
