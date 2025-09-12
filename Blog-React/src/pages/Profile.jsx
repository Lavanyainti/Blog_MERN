import React, { useEffect, useState } from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets'
import toast from 'react-hot-toast'
import axiosInstance from '../Middleware/Middleware'

const Profile = () => {

  const [userID,setUserID]=useState('')
  const [userName,setUserName]=useState('')
  const [image,setImage]=useState(false)
  const [profileDesciption,setProfileDescription]=useState('')
  

  const hadleProfileSubmit=async (e)=>{
              e.preventDefault();
              const profileDataAdd=new FormData()
              profileDataAdd.append("userID",userID);
              profileDataAdd.append("userName",userName)
              profileDataAdd.append("profileImage",image)
              profileDataAdd.append("profileDesciption",profileDesciption)

              try{
                  const addProfile=await axiosInstance().post('/addProfile',profileDataAdd,{headers: { "Content-Type": "multipart/form-data" }})
                  if(addProfile.status===200){
                    toast.success(addProfile.data.message)
                    
                  }
                  
              }catch(err){
                toast.error(err.response?.data?.message)
                console.log(err)
              }
  }


  return (
    <div className=''>
      <div className="w-full mt-5 flex item-center justify-center">
        <h2 className=' text-4xl text-primary font-semibold'>Create Profile</h2>
      </div>
        <form onSubmit={hadleProfileSubmit} className='flex flex-col gap-2 p-10'>
            <div className="">
                <p className='mt-3 text-primary font-medium'>Upload Profile Image</p>
                <label htmlFor="image">
                      <img src={!image? assets.upload_area : URL.createObjectURL(image)} alt="" className=' w-40 h-30 rounded  cursor-pointer' />
                      <input type="file" id='image' onChange={(e)=>setImage(e.target.files[0])} hidden />
                </label>
            </div>
            <p className='mt-3 text-primary font-medium'>UserID</p>
            <input type="text"  onChange={(e)=>setUserID(e.target.value)} placeholder='Enter user id' className='border px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none text-primary/80 sm:w-lg'/>
            <p className='mt-3 text-primary font-medium'>UserName</p>
            <input type="text" onChange={(e)=>setUserName(e.target.value)} placeholder='Enter user name' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none  sm:w-lg'/>
            <p className='mt-3 text-primary font-medium' >Description</p>
            <input type="text" onChange={(e)=>setProfileDescription(e.target.value)}  placeholder='Enter Description of your profile' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none  sm:w-lg'/>
            <button type='submit'  className='flex items-center text-white bgShadow rounded justify-center flex-start mt-5  py-1 w-30 bg-primary/80  hover:bg-primary hover:scale-105'>Submit</button>
        </form>

    </div>
  )
}

export default Profile
