import React, { useState } from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets'
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../Middleware/Middleware';

const AddBlog = () => {
    const [image,setImage]=useState(false);
    const [title,setTitle]=useState('');
    const [subTitle,setSubTitle]=useState('')
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState('Lifestyle')//by default it is lifestyle
    



    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        const createdAt=new Date().toISOString();
        const formData=new FormData()
        formData.append("thumbnailImage",image)
        formData.append("title",title)
        formData.append("subTitle",subTitle)
        formData.append("description",description)
        formData.append("category",category)
        formData.append("createdAt",createdAt)

        try{
            const addBlogResult=await axiosInstance().post("/addBlog",formData,{
                 headers: { "Content-Type": "multipart/form-data" },
            });
            if(addBlogResult.status===200){
                toast.success("Blog added successfully")
            }

        }catch(err){
            const error=err.response?.error?.message || "Add blog failed"
            toast.error(error)
            console.log(err)
        }
        //console.log(BlogData)

    }
  return (
    <div className='w-full  overflow-y-auto h-165'>
         <form onSubmit={onSubmitHandler} className="sm:w-150 w-60 ml-2 mt-2 sm:my-10 sm:ml-10 bg-white px-5 py-5 rounded bgShadow  flex flex-col ">
                <div className="image">
                    <p className='text-primary font-medium'>Upload Thumbnail</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className=' w-40 h-30 rounded  cursor-pointer'/>
                        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden   />
                    </label>
                </div>
                <p className='mt-3 text-primary text-sm sm:text-base font-medium'>Blog Title</p>
                <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='Enter blog title' className='border text-sm sm:text-base text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none w-40  sm:w-lg'/>
                <p className='mt-3 text-primary font-medium text-sm sm:text-base'>Sub Title</p>
                <input type="text" onChange={(e)=>setSubTitle(e.target.value)} placeholder='Enter blog title' className='border text-sm sm:text-base text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none w-40 sm:w-lg'/>
                <p className='mt-3 text-primary font-medium text-sm sm:text-base'>Description</p>
                <textarea name="" id="" onChange={(e)=>setDescription(e.target.value)} placeholder='Enter description to your blog' className='border border-gray-300 text-sm sm:text-base text-primary/80 h-50 rounded  focus:outline-none px-2 py-2 w-40 sm:w-lg'></textarea>
                <p className='mt-3 text-primary font-medium text-sm sm:text-base'>Category</p>
                <select name="" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className='text-primary text-sm sm:text-base border w-35 px-1 py-1 mt-1 rounded border-primary/10 focus:outline-none hover:cursor-pointer'>
                    <option value="Lifestyle" className='hover:cursor-pointer'>Lifestyle</option>
                    <option value="Technology" className='hover:cursor-pointer'>Technology</option>
                    <option value="Finance" className='hover:cursor-pointer'>Finance</option>
                    <option value="StartUp" className='hover:cursor-pointer'>StartUp</option>
                </select>
                <button type='submit ' className='flex items-center text-white bgShadow rounded justify-center flex-start mt-2  py-1 w-30 bg-primary/80  hover:bg-primary'>Add Blog</button>
         </form>
    </div>
  )
}

export default AddBlog
