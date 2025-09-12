const jwt=require('jsonwebtoken');
const User=require('../model/User');
require('dotenv').config();

const protect=async (req,res,next)=>{
        const authHeader=req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
        try{
            const token=authHeader.split(" ")[1];
            console.log(token)
            const decoded=jwt.verify(token, process.env.JWT_SECRETKEY);
            console.log("🔑 Decoded token = ", decoded);
            req.user=await User.findById(decoded.id).select("-password");//we use req.user instead of const user to use it in next routes like addBlog etc
            console.log("👤 User from DB:", req.user); 
            next();
        }catch(err){
            return res.status(401).json({message:"Invalid token"})
        }
    }else{
        return res.status(400).json({message:"No token provided"})
    }
}

module.exports=protect