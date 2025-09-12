import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { AiFillDashboard, AiOutlinePlusCircle, AiOutlineFileText, AiOutlineComment } from "react-icons/ai";
import { FaUsers ,FaUserCog} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AllBlogs from './AllBlogs';
import AddBlog from './AddBlog';
import Comments from './Comments';
import DashboardContent from './DashboardContent';
import { useEffect } from 'react';
import BlogUsers from './BlogUsers';
import Profile from './Profile';
import toast from 'react-hot-toast';
import ViewProfile from './ViewProfile';
import axiosInstance from '../Middleware/Middleware';
const Dashboard = () => {
  const [activeSection, setActiveSection]=useState("dashboard");
  const [profileData,setProfileData]=useState(null)
  const [hasProfile, setHasProfile]=useState(false);
  useEffect(()=>{
          const fetchProfile=async()=>{
                try{
                    const profileResult=await axiosInstance().get('/getProfile')
                    if(profileResult.status===200){
                          console.log(profileResult)
                          setHasProfile(true)
                          setProfileData(profileResult.data.getProfileResult)
                    }
                }catch(err){
                  toast.error("Failed to get profile")
                }
          }
        fetchProfile();
  },[])
  const renderSection=()=>{
        switch(activeSection){
            case "dashboard":
              return <DashboardContent/>;
            case "addblog":
              return hasProfile ? <AddBlog/> : <Profile/>
            case "allblogs":
              return <AllBlogs/>
            case "comments":
              return <Comments/>
            case "profile":
              return hasProfile ? <ViewProfile profileData={profileData}/> : <Profile/>
            case "allusers":
              return <BlogUsers/>
        }
  }

  
  return (
    <div>
      <div className="flex flex-row">
        <div className=" flex flex-col w-30  text-sm sm:text-base  sm:w-50 sm:h-165 h-screen bg-white  bgShadow rounded">
                {/*<AiFillDashboard size={20} /> <span>Dashboard</span>
                <AiOutlinePlusCircle size={20} /> <span>Add Blog</span>
                <AiOutlineFileText size={20} /> <span>All Blogs</span>
                <AiOutlineComment size={20} /> <span>Comments</span>*/}
                <Link to={'/dashboard'} onClick={()=>setActiveSection("dashboard")}> <p className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4 mt-8 ${activeSection==='dashboard' ? ' text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiFillDashboard size={20} />Dashboard</p> </Link>
                <Link  onClick={()=>setActiveSection("addblog")}> <p className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2  py-4 ${activeSection==='addblog' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiOutlinePlusCircle size={20} /> <span>Add Blog</span></p> </Link>
                <Link to={'/dashboard'} onClick={()=>setActiveSection("allblogs")}> <p className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='allblogs' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiOutlineFileText size={20} /> <span>All Blogs</span></p> </Link>
                <Link to={'/dashboard'} onClick={()=>setActiveSection("comments")}> <p className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='comments' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiOutlineComment size={20} /> <span>Comments</span></p> </Link>
                <Link to={'/dashboard'} onClick={()=>setActiveSection("profile")}> <p className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='profile' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <FaUserCog size={20} /> <span>Profile</span></p> </Link>
                <Link to={'/dashboard'} onClick={()=>setActiveSection("allusers")}> <p className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='allusers' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <FaUsers size={20} /> <span>All Users</span></p> </Link>
        </div>
        <div className="  w-full bg-primary/10 sm:h-165 h-screen overflow-y-auto">
                 {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
