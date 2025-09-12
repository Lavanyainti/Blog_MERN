const express=require('express')
const route=express.Router();
const userController=require('../controller/userController')


route.post('/register',userController.registerUser);
route.post('/login',userController.loginUser)

module.exports=route