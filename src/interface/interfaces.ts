import { Schema } from "jsonschema"
import * as e from "express";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

export interface User {
    id: string,
    firstName: string,
    surname: string,
    email: string,
    avatarUrl: string,
    createdAt: string,
    updatedAt?: string|undefined,
    // verifyEmail?:(email:string)=>boolean,
    // checkUniqueness?:(email:string)=>boolean
}
export interface Project {
    name: string,
    description: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
};
export interface queryProjectWithUserDetails {
    projectName?: string,
    createdBy?: string
}

//import { ISessionUser } from "@src/routes/middlware/adminMw";

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface ICUDResult<T = void> {
  success: boolean;
  data: { message: string } | T | null;
}

export interface IAuthPayload {
  id: string;
  username: string;
  email: string;
}


export type VerificationAndValidationType = {
    verifyEmail: string,
    checkUniqueness: string[]
}
export interface VerificationAndValidationInterface {
    verifyEmail(x: string): boolean | Error,
    checkUniqueness(x: string): boolean | Error
}


export interface IUser  {
    id:string,
    username: string;
    email: string;
    password: string;
  }