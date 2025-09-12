import React from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Middleware/Middleware';

const Header = () => {
  const [search,setSearch]=useState('');
  const [blogs,setBlogs]=useState([]);
  const navigate=useNavigate()

    useEffect(()=>{
          const fetchBlogs=async ()=>{
            try{
                const fetchedBlogs=await axiosInstance().get('/getBlog');
                const blogData=fetchedBlogs.data.userBlogs;
                setBlogs(blogData)
            }catch(err){
                console.log(err)
            }
          }
          fetchBlogs()
  },[])

  const handleSearch=async(e)=>{
    e.preventDefault();
    if(!search.trim()){
      toast.error("Search must not be empty")
      return
    }
    const filtered = blogs.filter(blog =>
      (blog.title?.toLowerCase().includes(search.toLowerCase())) ||
      (blog.content?.toLowerCase().includes(search.toLowerCase()))
    )
    navigate('/searchblog',{state:{results:filtered,query:search}})//navigate provides a special feature called keyword to send data
    //here results and query are user defined keywords, we can use anything. These accessed using location.state.results and location.state.query in the navigated file
  }
  return (
    <div className='mx-8 sm:mx-24 realtive'>
        <div className='text-center mt-20 mb-10' >
            <div className='inline-flex items-center justify-center gap-2 px-5 py-1.5 border-primary/40 bg-primary/10 rounded-full sm:text-sm'>{/*here /40 or /10 is opacity value */}
                <p>New: Blog Page Initiation</p>
                <img src={assets.star_icon} alt="" className='w-2.5'/>
            </div>
            <h1 className='text-3xl sm:text-6xl font-semibold text-gray-700 sm:leading-16 mt-5 '>Your own <span className='text-primary'>blogging</span> page</h1>{/*Text color = gray shade 700 (dark gray). Tailwind grays range from 100 (light) to 900 (almost black). */}
            <p className='my-6 text-gray-500 text-sm sm:text-lg sm:max-w-2xl m-auto'>This is your space to think out loud, to share what matters, and to write without filters.
                Whether it's one ord or thousand, your story starts here
            </p>

            <form className='flex mx-auto gap-2 justify-center max-w-sm sm:max-w-lg'>
                <input type="text" placeholder='search for blogs ' className='focus:outline-none border border px-3 py-1 w-50 sm:w-100 border-gray-300 bg-white rounded-lg overflow-hidden' required onChange={(e)=>setSearch(e.target.value)}/>
                <button className='text-primary cursor-pointer'><FaSearch size={15} onClick={handleSearch}/></button>
            </form>
            
        </div>
      <img src={assets.gradientBackground} alt="" className='absolute -z-1 opacity-50 -top-50'/>{/*z index is negative 1 because to place it behind od everything,
       opacity make light without dominating content, we decrease top here because it takes some top above*/}
    </div>
  )
}

export default Header
