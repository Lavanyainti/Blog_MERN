import React from 'react'
import { FaBlog, FaRegCommentDots } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { MdNewReleases } from "react-icons/md";
import { useState,useEffect } from 'react';
import axiosInstance from '../Middleware/Middleware';
import Moment from 'moment'
import { useNavigate } from 'react-router-dom';
const DashboardContent = () => {
  const [comments,setComments]=useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate=useNavigate()

  useEffect(()=>{
      const fetchComment=async()=>{
             try{
                   const fetchedcomments=await axiosInstance().get('/getCommentByUser')
                   const fetchedCommentResult=fetchedcomments.data.getCommentsByUserResult
                   console.log(fetchedCommentResult)
                   setComments(fetchedCommentResult)
                }catch(err){
                  console.log(err);
                  toast.error('Failed to fetch comments')
                }
      }
      const fetchBlog=async()=>{
              try {
                const fetchedBlogs = await axiosInstance().get('/getBlogByUser');
                const blogs = fetchedBlogs.data.userBlogs;
                console.log(blogs);
                setAllBlogs(blogs);
              } catch (err) {
                console.log(err);
              }
          }
      
      fetchComment();
      fetchBlog();
  },[])
  return (
    <div className=' h-166 px-10 py-20'>
         <div className="flex gap-10 flex-col sm:flex-row">
            <div className=" w-50 h-20 bg-white flex  items-center px-5 gap-5 rounded-lg bgShadow hover:cursor-pointer" onClick={()=>navigate('/allblogs')}> 
                <FaBlog size={20} className='text-primary'/>
                <div className="flex flex-col">
                    <h5>{allBlogs.length}</h5>
                    <p className='text-gray-500'>Blogs</p>
                </div>
                
            </div>
            <div className="w-50 h-20 bg-white flex items-center px-5 gap-5 rounded-lg bgShadow hover:cursor-pointer" onClick={()=>navigate('/comments')}>
                <FaRegCommentDots size={24} className="text-primary" />
                <div className="">
                        <h5 className=''>{comments.length}</h5>
                        <p className='text-gray-500'>Comments</p>
                </div>
            </div>
         </div>
         <div className="">
            <div className="">
                    <h4 className='font-semibold mt-10 flex gap-2 '><MdNewReleases size={20} className='text-primary'/> Latest Blogs</h4>
                    <div className="flex  px-2 sm:px-10 sm:w-200 bg-white rounded bgShadow text-sm sm:text-base  items-center justify-between  py-5 mt-5 ">
                        <h2 className='font-semibold '>Blog Title</h2>
                        <h2 className='font-semibold  '>Date</h2>
                        
                    </div>
                    {allBlogs.slice(0, 3).map(blogs=>(
                      <div key={blogs._id} className="flex  px-2 sm:px-10 sm:w-200 bg-white rounded bgShadow text-sm sm:text-base items-center justify-between   py-5 mt-3 ">
                        <p className=''>{blogs.title} </p>
                        <p className='text-gray-600'>{blogs.createdAt.split("T")[0]}</p>
                        
                    </div>
                    ))}
            </div>
            
         </div>
    </div>
  )
}

export default DashboardContent
