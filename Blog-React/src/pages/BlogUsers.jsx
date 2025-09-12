import React, { useEffect, useState } from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets'
import toast from 'react-hot-toast'
import axiosInstance from '../Middleware/Middleware'
import { useNavigate } from 'react-router-dom'

const BlogUsers = () => {
  const [users,setUsers]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
          const getUsers=async ()=>{
               try{
                    const getUsersResult=await axiosInstance().get('/getUsers');
                    if(getUsersResult.status===200){
                       setUsers(getUsersResult.data.getUsersResult)
                    }
               }catch(err){
                    console.log(error)
               }
          }
          getUsers();
  },[])

  return (
    <div className='flex flex-col items-center mt-10 gap-5 overflow-x-scroll px-2'>
         {users.length>0 ?(
          users.map((user)=>{
               const userImage=`http://localhost:5001/uploadProfileImage/${user.profileImage}`
               return(
            <div key={user.userID} className="w-full max-w-md bg-white px-3 py-3 flex items-center justify-between gap-3 sm:gap-5 hover:scale-105 transition-transform rounded-lg shadow-md">
                    <img src={user.profileImage ? userImage : assets.user_icon} alt="" className="w-12 h-12 object-cover rounded-full border border-primary"/>
                    <div className="flex-1 min-w-0">
                    <h4 className="text-primary truncate">{user.userID}</h4>
                    <p className="text-primary/80 truncate">{user.userName}</p>
                    </div>
                    <button className="border border-primary rounded px-2 py-1 text-sm text-primary hover:bg-primary hover:text-white transition" onClick={() => { navigate(`/userProfile/${user.user}`) }}>
                         View
                    </button>
           </div>

          )})
        
         ):(
          <p className='text-gray-500'>No users found</p>
         )}
    </div>
  )
}

export default BlogUsers
