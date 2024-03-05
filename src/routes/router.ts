import { Router } from "express";

import { getJwtTokenValidador } from "../middleware/jwtTokenValidador";
import  { GetUser,GetProject, GetAllUser,GetAllProject, PostUser,PostProject, UpdateUser,UpdateProject, DeleteUser,DeleteProject } from "../services/userRequests";

const router = Router();

router.get("/user/get", getJwtTokenValidador(), GetUser);
router.get("/project/get", getJwtTokenValidador(), GetProject);

router.get("/user/getall", getJwtTokenValidador(), GetAllUser);
router.get("/project/getall", getJwtTokenValidador(), GetAllUser);

router.post("/user/post", getJwtTokenValidador(), PostUser);
router.post("/project/post", getJwtTokenValidador(), PostProject);

router.put("/user/update", getJwtTokenValidador(), UpdateUser);
router.put("/project/update", getJwtTokenValidador(), UpdateUser);

router.delete("/user/delete", getJwtTokenValidador(), DeleteUser);
router.delete("/project/delete", getJwtTokenValidador(), DeleteProject);

export default router;

