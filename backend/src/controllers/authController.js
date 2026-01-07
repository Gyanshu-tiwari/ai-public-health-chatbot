import userModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {generateToken} from "../utils/generateToken.js"

export const register = async function(req, res){
    try {
        let {name, email , password} = req.body;

        let user =await userModel.findOne({email: email});
        if(user) {
            return res.status(400).json({message : "User already exists"})
        }
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if (err){
                    return res.status(500).json({message : "Error in password hashing"})
                }
                else {
                    let user = await userModel.create({
                    name,
                    email,
                    password : hash 
                    })
                    
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.status(201).json({message : "User registered successfully"})
                }
            })
        })
    } catch (error) { 
        console.log(error.message)
    }
}

export const login = async function(req, res){
    try {
        let {email, password} = req.body;

        let user = await userModel.findOne({email:email});
        if(!user) {
           
            return res.status(400).json({message : "User does not exist"})
        };
        bcrypt.compare(password, user.password, function (err, result) {
           if(result) {
              let token = generateToken(user);
              res.cookie("token", token);
              res.status(200).json({message : "Login successful"});
            }
            else{
               ;
               return res.status(401).json({message : "Invalid credentials"});
            }
        })
    } catch (error) { 
        console.log(error.message)
    }
};

export const logout = function (req, res) {
    res.cookie("token","");
    res.status(200).json({message : "Logout successful"});
};

export const getUser = async (req, res) => {
    try{
        const user = req.user;
        return res.json({success:true, user});
    }catch(err){
        return res.json({success:false, message:err.message});
    }
}