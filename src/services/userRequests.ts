import { NextFunction, Request, Response, Router } from "express";
import HttpStatusCodes from "../utils/HttpStatusCodes";
import { Attributes } from "../controller/resolverFunctions";
import { Project, User } from "../interface/interfaces";
import UserDataJSON from '../../DataFile/UserData.json';
import ProjectDataJSON from '../../DataFile/ProjectData.json';
import { randomUUID } from "crypto";
import { generateAvatarUrl } from "../controller/user";
import { Validator, Schema } from 'jsonschema'
import { body } from "express-validator";
import { ReqBodyValidationService } from "./validationService";
import { return404ErrorMessage } from "../controller/errorHandler";
import { ProjectGetSchema, ProjectPostSchema, UserGetSchema, UserPostSchema } from "./validator";


const GetUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = ReqBodyValidationService(req.body, UserGetSchema);
        if (typeof validationResult === "string") {
            return404ErrorMessage(res, validationResult);
            return;
        }
        else if (validationResult.length > 0) {
            return404ErrorMessage(res, validationResult);
            return;
        }
        const UserAttributes = new Attributes<User>(UserDataJSON);
        const UserData = UserAttributes.get(UserDataJSON,req.body)
        if (typeof UserData == "string") {
            return404ErrorMessage(res, UserData);

        }
        res.status(HttpStatusCodes.OK).json(UserData)
    } catch (error: any) {
        next(error)
    }
};

const GetProject = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = ReqBodyValidationService(req.body, ProjectGetSchema);
        if (typeof validationResult === "string") {
            return404ErrorMessage(res, validationResult);
            return;
        }
        else if (validationResult.length > 0) {
            return404ErrorMessage(res, validationResult);
            return;
        }
        const ProjectAttributes = new Attributes<Project>(ProjectDataJSON);

        const ProjectData = ProjectAttributes.get(ProjectDataJSON,req.body);
        if (typeof ProjectData == "string") {
            return404ErrorMessage(res, ProjectData);

        }
        res.status(HttpStatusCodes.OK).json(ProjectData)
    } catch (error: any) {
        next(error)
    }
};


const GetAllUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserAttributes = new Attributes<User>(UserDataJSON);
        const UserData = UserAttributes.getAll();
        if (typeof UserData == "string") {
            return404ErrorMessage(res, UserData);

        }
        res.status(HttpStatusCodes.OK).json(UserData)
    } catch (error: any) {
        next(error)
    }
};


const GetAllProject = (req: Request, res: Response, next: NextFunction) => {
    try {
        const ProjectAttributes = new Attributes<Project>(ProjectDataJSON);
        const ProjectData = ProjectAttributes.getAll()
        if (typeof ProjectData == "string") {
            return404ErrorMessage(res, ProjectData);
            return
        }
        res.status(HttpStatusCodes.OK).json(ProjectData)
    } catch (error: any) {
        next(error)
    }
};
const PostUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = ReqBodyValidationService(req.body, UserPostSchema);
        if (typeof validationResult === "string") {
            return404ErrorMessage(res, validationResult);
            return;
        }
        else if (validationResult.length > 0) {
            return404ErrorMessage(res, validationResult);
            return;
        }
        else {
            req.body.id = randomUUID()
            req.body.createdAt = new Date()
            req.body.avatarUrl = generateAvatarUrl(req.body.email)
            const UserAttributes = new Attributes<User>(UserDataJSON);
            const UserData = UserAttributes.post(UserDataJSON,'UserData', req.body, { "email": req.body.email });
            if (typeof UserData == "string") {
                return404ErrorMessage(res, UserData);
                return
            }
            res.status(HttpStatusCodes.OK).json(UserData)
        }
    } catch (error: any) {
        next(error)
    }
};


const PostProject = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = ReqBodyValidationService(req.body, ProjectPostSchema);
        if (typeof validationResult === "string") {
            return404ErrorMessage(res, validationResult);
            return;
        }
        else if (validationResult.length > 0) {
            return404ErrorMessage(res, validationResult);
            return;
        }
        else {
            const ProjectAttributes = new Attributes<Project>(ProjectDataJSON);
            req.body.id = randomUUID()
            req.body.createdAt = new Date()
            const ProjectData = ProjectAttributes.post(ProjectDataJSON,'ProjectData', req.body, { "name": req.body.name })
            if (typeof ProjectData == "string") {
                return404ErrorMessage(res, ProjectData);
                return
            }
            res.status(HttpStatusCodes.OK).json(ProjectData)
        }
    } catch (error: any) {
        next(error)
    }
};


const UpdateUser = (req: Request, res: Response, next: NextFunction) => {

    try {
        if (req.baseUrl.search('user') > 0) {

        }
        else if (req.baseUrl.search('project') > 0) {
        }

    } catch (error) {
        next(error)
    }

};

const UpdateProject = (req: Request, res: Response, next: NextFunction) => {

    try {
        if (req.baseUrl.search('user') > 0) {

        }
        else if (req.baseUrl.search('project') > 0) {
        }

    } catch (error) {
        next(error)
    }

};
const DeleteUser = (req: Request, res: Response, next: NextFunction) => {

    try {
    } catch (error) {
        next(error)
    }

};

const DeleteProject = (req: Request, res: Response, next: NextFunction) => {

    try {
    } catch (error) {
        next(error)
    }

};
export { GetUser, GetProject, GetAllUser, GetAllProject, PostUser, PostProject, UpdateUser, UpdateProject, DeleteUser, DeleteProject };