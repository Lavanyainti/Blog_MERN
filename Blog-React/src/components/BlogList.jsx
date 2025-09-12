import React, { useEffect, useState } from 'react'
import './BlogList.css'
import { blog_data, blogCategories } from '../assets/QuickBlog-Assets/assets';
import BlogCard from './BlogCard';
import axiosInstance from '../Middleware/Middleware';
import axios from 'axios';

const BlogList = ({registerData ,userData}) => {
  const [activeSection, setActiveSection]=useState('All');
  const [allBlogs,setAllBlogs]=useState([]);


  useEffect(()=>{
          const fetchBlogs=async ()=>{
            try{
                const fetchedBlogs=await axios.get('http://localhost:5001/api/getBlog');
                const blogs=fetchedBlogs.data.userBlogs;
                console.log(blogs)
                setAllBlogs(blogs)
            }catch(err){
                console.log(err)
            }
          }
          fetchBlogs()
  },[])
   const filteredBlog=activeSection==='All' ? allBlogs: allBlogs.filter(blog=> blog.category.toLowerCase()===activeSection.toLowerCase())
  //first we filter the blog based on that category and send those blogs to map when user click that specifi blog
  
  return (
    <div>
      <div className="justify-center flex sm:text-base text-sm  m-auto  gap-2 sm:gap-8 sm:my-10 cursor-pointer">
            <button className={`activeSection ${activeSection==="All" && 'active'}`} onClick={()=>{setActiveSection('All')}}>All</button>
            <button className={`activeSection ${activeSection==="Technology" && 'active'}`} onClick={()=>{setActiveSection('Technology')}}>Technology</button>
            <button className={`activeSection ${activeSection==="Startup" && 'active'}`} onClick={()=>{setActiveSection('Startup')}}>Startup</button>
            <button className={`activeSection ${activeSection==="LifeStyle" && 'active'}`} onClick={()=>{setActiveSection('LifeStyle')}}>Lifestyle</button>
            <button className={`activeSection ${activeSection==="Finance" && 'active'}`} onClick={()=>{setActiveSection('Finance')}}>Finance</button>
      </div>
      <div className=' my-10 max-w-6xl mx-auto  justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
      xl:gap-16 gap-8'>
            {filteredBlog.length>0 ?(
              filteredBlog.map(blog=>(
                <BlogCard key={blog._id} blog={blog} />
              ))
            ):(
              <div className="flex flex-col justify-center items-center col-span-full h-40">
                  <p className="text-gray-500 text-center">
                    No blogs added yet in this category
                  </p>
              </div>          
             )}
      </div>
    </div>
  )
}

export default BlogList
