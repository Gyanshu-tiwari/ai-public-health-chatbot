import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const  isLoggedIn = async (req, res, next) => {
    if(!req.cookies.token){
        return res.status(401).json({message : "Unauthorized"});
    }
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user =  await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({message : "Unauthorized"});
    }
}