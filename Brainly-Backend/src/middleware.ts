import { NextFunction, Request, Response } from "express"
import { JWTpassword } from "./config";
import  jwt  from "jsonwebtoken";
export const userMiddleware =(req:Request,res:Response ,next:NextFunction)=>{
    const header= req.headers["authorization"]
    const decoded= jwt.verify(header as string,JWTpassword)
    if(decoded){
        //@ts-ignore
        req.userId= decoded.id,
        next()
    }
    else{
        res.status(403).json({
            message:"you are not logged in."
        })
    }
}