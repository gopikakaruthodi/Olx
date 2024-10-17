import userSchema from "./models/user.model.js"
import productSchema from "./models/product.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const{sign}=jwt

export async function getUser(req,res) {
    try {
        // console.log(req.params);
        const _id=req.params;
        const user=await userSchema.findOne({_id})
        const userProducts=await productSchema.find({sellerId:_id})
        // console.log(userProducts);
        
        res.status(200).send({user,userProducts})
        
    } catch (error) {
        res.status(404).send({msg:error})

        
    }
     
}
export async function getUsers(req,res) {
    try {
        const user=await userSchema.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({msg:error})
        
    }
    
}
export async function getProducts(req,res) {
    try {
        const _id=req.user.userId 
        if (req.user!==null) {
            const _id = req.user.userId;
            const user = await userSchema.findOne({_id});
            const products=await productSchema.find()
            // console.log(products);
            
            return res.status(200).send({products,profile:user.profile,id:_id})
        }else{
            return res.status(403).send({user,msg:"Login for better user experience"})
        }
    } catch (error) {
        res.status(404).send({msg:error})
        
    }
    
}
export async function signup(req,res) {
    console.log(req.body);
    const{email,username,password,cpassword,place,address,phone,pincode,profile}=req.body
    if(!(username&&email&&password&&cpassword&&place&&address&&phone&&pincode&&profile))
        return res.status(404).send({msg:"Fields empty"})
    const user=await userSchema.findOne({email})
    if(user)
       return res.status(404).send("Email Already Exist")
    if(password!=cpassword)
       return res.status(404).send("Email Already Exist")
    bcrypt.hash(password,10).then(async(hashedPassword)=>{
        console.log(hashedPassword); 
        await userSchema.create({username,email,password:hashedPassword,place,address,phone,pincode,profile}).then(()=>{
            res.status(201).send({msg:"Successfully Registered"})
        }).catch((error)=>{
            res.status(404).send({msg:error})
        }) 
    }).catch((error)=>{
        console.log(error);   
    })
   
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
export async function updateUser(req,res) {
    try {
        const _id=req.params
        const{email,username,password,cpassword,place,address,phone,pincode,profile}=req.body
        if(!(username&&email&&place&&address&&phone&&pincode&&profile))
            return res.status(404).send({msg:"Fields empty"})
        await userSchema.updateOne({_id},{$set:{email,username,password,cpassword,place,address,phone,pincode,profile}}).then(()=>{
            res.status(201).send({msg:"Successfully Updated"})

        }).catch((error)=>{
            res.status(404).send({msg:error})
        })

        
    } catch (error) {
        console.log(error);
        
        
    }
    
}

export async function addProducts(req,res) {
    const{...product}=req.body
    await productSchema.create({...product}).then(()=>{
        res.status(201).send({msg:"Success"})

    }).catch((error)=>{
        res.status(404).send({msg:error})
    })
    
}

export async function deleteUser(req,res) {
    const _id=req.params
    await userSchema.deleteOne({_id}).then(()=>{
        res.status(200).send({msg:"Successfully Deleted"})
    }).catch((error)=>{
        res.status(404).send({msg:error})
    })
    
}

export async function getProductDetails(req,res) {
    try {
        const _id=req.params
        const product=await productSchema.findOne({_id})
        res.status(200).send(product)
        
    } catch (error) {
        console.log(error);
        
        
    }

    
}
export async function updateProduct(req,res) {
    try {
        const _id=req.params
        const {...product}=req.body
        await productSchema.updateOne({_id},{$set:{...product}}).then(()=>{
            res.status(201).send({msg:"Successfully Updated"})
        }).catch((error)=>{
           res.status(404).send({msg:error})
        })
        
        
    } catch (error) {
        console.log(error);
        
        
    }

    
}
export async function deleteProduct(req,res) {
    try {
        const _id=req.params
        console.log(_id);
        
        await productSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Successfully Deleted"})
        }).catch((error)=>{
            res.status(404).send({msg:error})
        })
    } catch (error) {
        console.log(error);    
    }   
}

export async function getProductss(req,res) {
    try {
        const products=await productSchema.find();
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}
