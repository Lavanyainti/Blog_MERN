const express=require('express');
const route=express.Router();
const middleware=require('../Middleware/middleware')
const multer=require('multer')
const path=require('path');
const { addProfile, getProfile, getUsers, getProfileByUserToUser } = require('../controller/profileController');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'UploadProfileImage/')
    },
    filename:(req,file,cb)=>{
            cb(null, Date.now() + path.extname(file.originalname));
    }
})

const UploadProfileImage=multer({storage});

route.post('/addProfile',middleware,UploadProfileImage.single('profileImage'),addProfile);
route.get('/getProfile',middleware,getProfile)
route.get('/getUsers',getUsers)
route.get('/getProfileByUserToUser/:id',getProfileByUserToUser)

module.exports=route