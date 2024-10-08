import userSchema from "./models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const{sign}=jwt
export async function addMember(req,res) {
    console.log(req.body);
    const{...user}=req.body
    await userSchema.create({...user})
     
}



export async function signin(req,res) {
    try {
            // console.log(req.body);
        const{email,password}=req.body  
        if(!(email&&password))
            return res.status(404).send({msg:"Fields are empty"})  
        const user=await userSchema.findOne({email})
        if(!user)
            return res.status(404).send({msg:"Invalid Email"})
        const success=await bcrypt.compare(password,user.password)
        if(!success)
            return res.status(404).send({msg:"Invalid Password"})
        const token= await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
        console.log(token);
        res.status(200).send({msg:"Successfully logged in",token})
        
    } catch (error) {
        console.log(error);  
    }
}

