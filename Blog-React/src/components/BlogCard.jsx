import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Utility/getUser';

const BlogCard = ({blog}) => {
    const {_id, title, description, category, thumbnailImage, }=blog;
    const cleanDescription = description.replace(/<[^>]+>/g, ''); 
    const navigate=useNavigate();
    const [userData,setUserData]=useState(()=>getUser())

    const imageUrl = `http://localhost:5001/uploads/${thumbnailImage}`;

    const handlClick=()=>{
       if(!userData){
          toast.error("Please login to see the blog info")
          navigate('/login')
          return
        }
        navigate(`/blog/${_id}`)
    }

  return (
    <div onClick={handlClick} className="sm:w-72 w-50 text-sm sm:text-base sm:h-[400px] hover:scale-102 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white m-auto">
       <img src={imageUrl} alt="" className='aspect-video w-full h-44 '/>
       <span className='ml-5 mt-3 inline-block py-1 sm:py-2 px-3 bg-primary/40 rounded-full'>{category}</span>
       <div className='p-5'>
            <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
            <p className="mb-3 text-x5 text-gray-600">{description}</p>

       </div>
    </div>
  )
}

export default BlogCard
