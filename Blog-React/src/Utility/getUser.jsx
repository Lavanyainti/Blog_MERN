import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode'

function getUser() {
        const user=JSON.parse(localStorage.getItem('userData'));
        return user;
}
function getRegisterUser(){
        const regUser=JSON.parse(localStorage.getItem('registerData'));
        return regUser;
}

function isTokenExpired(token){
        if(!token) return true;

        try{
                const {exp}=jwtDecode(token)
                const date=Math.floor(Date.now() / 1000);//we need to convert it to exact milliseconds since we devide it by 1000 it returns decimal values also
                if(exp<date){
                        return true;
                }

        }catch(err){
               return true 
        }
}

export {getRegisterUser,getUser, isTokenExpired}

