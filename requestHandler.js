import userSchema from "./models/user.model.js"
import productSchema from "./models/product.model.js"
import wishSchema from "./models/wish.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "f0aa0455de109f",
      pass: "ee27db4635150c",
    },
  });


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
// export async function getUsers(req,res) {
//     try {
//         const user=await userSchema.find()
//         res.status(200).send(user)
//     } catch (error) {
//         res.status(404).send({msg:error})
        
//     }
    
// }
export async function getProducts(req,res) {
    try {
        const products=await productSchema.find();
        if (req.user!==null) {
            const _id = req.user.userId;
            const user = await userSchema.findOne({_id});
            const products=await productSchema.find()
            // console.log(products);
            return res.status(200).send({products,profile:user.profile,id:_id})
        }else{
            return res.status(403).send({products,msg:"Login for better user experience"})
        }
    } catch (error) {
        console.log(error);
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
       return res.status(404).send("Password Mismatch")
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

// update product details
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

// delete product 
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


// find product details for search
export async function getProductss(req,res) {
    try {
        const products=await productSchema.find();
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function addWish(req,res) {
    try {
        const{...data}=req.body
        // console.log(data);
        
        await wishSchema.create({...data}).then(()=>{
            res.status(201).send({msg:"Added to wishlist"})
        }).catch((error)=>{
            res.status(404).send({msg:error})
        })   
    } catch (error) {
        console.log(error);   
    }
}

export async function getWish(req,res) {
    try {
        const wish=await wishSchema.find();
        // console.log(wish);
        res.status(200).send(wish)
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function deleteWish(req,res) {
    try {
        const _id=req.params
        // console.log(_id);
        
        await wishSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Successfully Deleted"})
        }).catch((error)=>{
            res.status(404).send({msg:error})
        })
    } catch (error) {
        console.log(error);    
    }   
}




// otp generation code
export async function generateOTP(req,res) {

try {
    console.log(req.body);
    const {email}=req.body
    const user=await userSchema.findOne({email})
    if(!user)
        return res.status(404).send("Invalid Email")

    let digits = '0123456789'; 
    let OTP = ''; 
    let len = digits.length 
    for (let i = 0; i < 6; i++) { 
        OTP += digits[Math.floor(Math.random() * len)]; 
    } 
    console.log(OTP);
    await userSchema.updateOne({email},{$set:{otp:OTP}}).then(async()=>{
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: `${email}`, // list of receivers
            subject: "OTP", // Subject line
            text: "Verification", // plain text body
            html: `<b>Your OTP is ${OTP}</b>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          res.status(201).send({msg:"OTP Sent To Your Email"})
          
    }).catch((error)=>{
        console.log(error);
        
    })
    
} catch (error) {
    console.log(error);
    
    
}   
}

export async function compareOTP(req,res) {
    try {
        const {otp}=req.body
        console.log(otp);
        const user=await userSchema.findOne({otp})
        console.log(user);
        if(otp!=user.otp)
            return res.status(404).send({msg:"fail"})
        await userSchema.updateOne({otp},{$set:{otp:null}}).then(()=>{
            res.status(200).send({msg:"success"})    

        }).catch((error)=>{
            res.status(404).send({msg:error})    

        })
    } catch (error) {
        console.log(error);
        
        
    }
    
    
}
export async function changePassword(req,res) {
    try {
        console.log("kk");
        const{password,cpassword,email}=req.body
        const user=await userSchema.findOne({email})
         if(password!=cpassword)
            return res.status(404).send("Password Mismatch")
         bcrypt.hash(password,10).then(async(hashedPassword)=>{
             console.log(hashedPassword); 
             await userSchema.updateOne({email},{$set:{password:hashedPassword}}).then(()=>{
                 res.status(201).send({msg:"Your Password has been reset"})
             }).catch((error)=>{
                 res.status(404).send({msg:error})
             }) 
         })

        
    } catch (error) {
        console.log(error);
        
        
        
    }
    
    
}
