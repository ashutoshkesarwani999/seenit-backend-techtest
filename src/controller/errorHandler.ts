import HttpStatusCodes from "../utils/HttpStatusCodes";
import {  Response } from "express";

const return404ErrorMessage = (res: Response, errorMessage: unknown) => {
    if (typeof errorMessage === "string") {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ message: errorMessage });
      return;
    }
  
    if (errorMessage instanceof Error) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: errorMessage.message + " -> " + errorMessage.stack });
      return;
    }
  
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message: errorMessage });
}

export {return404ErrorMessage}


//   const return500ErrorMessage = (res: Response, errorMessage: unknown) => {
//     res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
    
//   };
  

//   export {return500ErrorMessage}