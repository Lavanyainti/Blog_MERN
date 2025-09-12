import React, { useState } from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('')
    const [errors,setErrors]=useState({})
    const navigate=useNavigate();

    const validateEmail = async (email) => {
        try {
            const url = `http://apilayer.net/api/check?access_key=8e45a01ab2d0321726d0897a44e5dd1a&email=${email}&smtp=1&format=1`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)

            if (!data.format_valid || !data.mx_found || data.score < 0.5 ) {
                toast.error("Please enter a valid email");
                return false;
            }
            return true;
        } catch (error) {
            toast.error("Error validating email");
            return false;
        }
    };

    const validatePassword=(password)=>{
        const newErrors={}
         if(password.length<8) newErrors.length="Password must contain 8 or above characters";
         if (!/[A-Z]/.test(password)) newErrors.uppercase = "At least one uppercase letter required";
         if (!/[a-z]/.test(password)) newErrors.lowercase = "At least one lowercase letter required";
         if (!/[0-9]/.test(password)) newErrors.digit = "At least one digit required";
         if (!/[@$!%*?&]/.test(password)) newErrors.special = "At least one special character required (@$!%*?&)";   
         return newErrors;     
    }

    const handleRegisterSubmit=async (e)=>{
        e.preventDefault();

        if(!email || !password || !confirmPassword){
            toast.error("All fiels required")
            return
        }
        const validEmail=await validateEmail(email)
        if (!validEmail) return;
        const passwordErrors=validatePassword(password)
        if(Object.keys(passwordErrors).length>0){
            setErrors(passwordErrors)
            return;
        }else{
            setErrors('')
        }

        const userData={
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }

        if(userData.password !== userData.confirmPassword){
                toast.error('Passwords do not match')
                return
        }
        try{
            const registerResult=await axios.post('http://localhost:5001/api/register',userData);
            if(registerResult.status===200 || registerResult.status===201){
                toast.success('Registration successful')
                localStorage.setItem('registerData',JSON.stringify(registerResult.data.newUser))
                navigate('/login')

            }
        }catch(err){
            toast.error(err)
        }
        
    }
  return (
     <div className='flex flex-col items-center justify-center mt-30  '>{/*h-screen in height to full screen */}
         <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
         <h1 className=' text-center font-semibold text-xl sm:text-4xl'>Create your account</h1>
                 <div className="border rounded-lg border-primary/10 p-10 max-w-sm sm:max-w-xl gap-2 bg-white mt-10  bgShadow">
                         <form className='flex flex-col ' onSubmit={handleRegisterSubmit}>
                             <p className='text-gray-700'>Username</p>
                             <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Your Email Address' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded sm:w-sm focus:outline-none' required/>                             <p className='mt-4 text-gray-700'>Password</p>
                             <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Your Password' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded focus:outline-none' required/>
                             <div className="">{Object.values(errors).map((err, idx) => (
                                <div key={idx} className="text-red-500">• {err}</div>
                                ))}
                            </div>
                             <p className='mt-4 text-gray-700'>Confirm Password</p>
                             <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Re-Enter Your Password' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded focus:outline-none' required/>
                             <button type='submit' className='border border-primary/20 bg-primary/90 px-5 py-1 text-white mt-5 rounded hover:bg-primary/100'>Sign Up</button>
                         </form>
                 </div>
        </div>
   )
}

export default Register
