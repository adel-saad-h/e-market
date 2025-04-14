
/*
-here we get the toke from frontEnd 
-make sure that token is generated with my secret key
-add the user data to the request parameter
*/


import { ExtendRequest } from "../types/extendRequest";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
        res.status(403).send("Authorization header not found");
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("Token was not found")
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
        if (err) {
            res.status(403).send("Invalid token : " + err)
            return
        }
        if (!payload) {
            res.status(403).send("Invalid token payload")
            return
        }
        const userPayload = payload as {
            email: string;
            firstName: string;
        }
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    })

}

export default validateJWT