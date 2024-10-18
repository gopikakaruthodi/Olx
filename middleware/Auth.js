import jwt from "jsonwebtoken"
const {verify}=jwt
export default async function Auth(req,res,next) {
   try {
     // console.log(req.headers);
     const key=req.headers.authorization
     if(!key)
      return res.status(403).send("Unautherized Access")
     // console.log(key);
     const token=key.split(" ")[1] 
     // console.log(token);
     const auth=await verify(token,process.env.JWT_KEY)
     console.log(auth);
     req.user=auth
     next()
    
   } catch {
        req.user=null
        next()
    
   }
}