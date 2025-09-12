import React, { useState,useEffect } from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Middleware/Middleware';

const ViewProfile = ({profileData}) => {
  const {profileImage}=profileData;
  const [allBlogs, setAllBlogs] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await axiosInstance().get('/getBlogByUser');
        const blogs = fetchedBlogs.data.userBlogs;
        console.log(blogs);
        setAllBlogs(blogs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  const imageUrl = `http://localhost:5001/uploadProfileImage/${profileImage}`;
  return (
    <div>
        <div className='flex flex-col items-center mt-5'>
            <div className='w-50 text-sm text-center sm:text-base sm:w-100 flex flex-col items-center justify-center p-5 gap-2 rounded-2xl sm:bg-white sm:bgShadow'>
                <div className="">
                  <img src={imageUrl? imageUrl : assets.user_icon} alt="" className='w-40 h-40 rounded rounded-full'/>
                </div>
                <h1 className='text-xl font-bold text-primary'>{profileData.userID}</h1>
                <p className='text-primary'>{profileData.userName}</p>
                <p className='text-primary/80'>{profileData.profileDesciption}</p>
                <button className=' px-4 py-1 bg-primary/90 hover:bg-primary hover:scale-105 text-white rounded w-20' onClick={()=>{navigate(`/profile`)}}>Edit</button>
            </div>
        </div>
      <div className="flex flex-wrap justify-center gap-6 mt-8">
      {allBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        allBlogs.map((blog) => {
          const imageUrl2 = `http://localhost:5001/uploads/${blog.thumbnailImage}`;
          return (
            <div key={blog._id} onClick={()=>{navigate(`/blog/${blog._id}`)}} className="sm:w-72 w-40 text-sm w:text-base hover:scale-105 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white hover:cursor-pointer">{/*we fixed that path in app.jsx */}
              <span className="ml-2 mt-3 inline-block text-primary sm:py-2 px-3 font-semibold  rounded-full">{blog.category}</span>
              <div className="px-5">
                <h5 className="mb-2 font-medium text-gray-900">{blog.title}</h5>
                <p className="mb-3 text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
    </div>
  )
}

export default ViewProfile
