import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/QuickBlog-Assets/assets';
import Moment from 'moment'
import axiosInstance from '../Middleware/Middleware';
import toast from 'react-hot-toast';
import { getUser } from '../Utility/getUser';

const Blog = () => {
  const navigate=useNavigate();
  const {id}=useParams();//we are getting id from the url where we click, while navigating we are sending id so we get that here
  const [data,setData]=useState(null)
  const [comments, setComments]=useState([])
  const [comment,setComment]=useState('')
  const [userData,setUserData]=useState(()=>getUser())
  


  const handleAddComment=async (e)=>{
    e.preventDefault()
    const commentedAt=new Date().toISOString();
    const commentData={
      comment:comment
    }
    try{
      const addCommentResult=await axiosInstance().post(`/addComment/${id}`,commentData);
      const commentTime=commentedAt.split("T")[1]
      console.log(commentTime)
    if(addCommentResult.status===200){
      const addedCommentResult=addCommentResult.data.result
      toast.success('comment added')
       const newComment = {
        comment: comment,
        createdAt: addedCommentResult.createdAt, // fake timestamp for now
      };
      setComments([newComment, ...comments])
    }
    }catch(err){
      console.log(err)
      toast.error('Comment Failed')
    }

  }
  useEffect(()=>{
    const fetchBlogData=async()=>{
        const fetchedBlogData=await axiosInstance().get(`/getBlogById/${id}`);
        if(fetchedBlogData){
          console.log(fetchedBlogData.data.blogById.user)
                  setData(fetchedBlogData.data.blogById)
        }
    }
    fetchBlogData();

    const fetchComments=async()=>{
     // const itemComments=comments_data.filter(comment=>comment.blog._id===id)//filter is used to fetch array of data return multiple

     try{
        const itemComments=await axiosInstance().get(`/getComment/${id}`)
      if(itemComments.status===200){
        const itemCommentsData=itemComments.data.commentResult
        console.log(itemCommentsData)
        setComments(itemComments.data.commentResult)
        setComment('')
      }
     }catch(err){
          console.log(err)
     }
      
    }

    fetchComments();
  },[])

  const handledeleteBlog=async ()=>{
       try{
            const deleteResult=await axiosInstance().delete(`deleteBlog/${id}`)
            if(deleteResult.status===200){
               toast.success("delete successfull")
               navigate('/dashboard')
            }
       }catch(err){
        toast.error("Delete Fail")
        console.log(err)
       }
  }
const imageURL = data ? `http://localhost:5001/uploads/${data.thumbnailImage}` : "";

  return data ? (
    <div className='relative text-sm sm:text-base'>
      <img src={assets.gradientBackground} className='absolute opacity-50 -top-50 -z-1' alt="" />
      <div className=" flex flex-col  jutify-center items-center mt-20 ">
        <p className=" p-5 text-primary font-medium">Published On {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className="md:text-3xl font-semibold my-2 ">{data.title}</h1>
        <p className='text-gray-500'>{data.subTitle}</p>
        <p className='border border-primary/35 my-5 py-1 px-4 rounded-full bg-primary/10 font-medium text-primary'>Michale</p>{/*Author name */}
        {userData && data.user && userData.id==data.user &&(
          <div className=' px-2 py-1 rounded bg-primary/80 hover:bg-primary hover:cursor-pointer text-white ' onClick={handledeleteBlog}>Delete Blog</div>
        )}
      </div>
      <div className=" flex  justify-center flex-col items-center ">
        <img src={imageURL} className='sm:h-60 w-50 h-40  sm:w-100 mt-5 rounded-3xl' alt="" />
        <p dangerouslySetInnerHTML={{__html:data.description}} className='rich-text max-w-xl md:max-w-3xl'></p>
      </div>
      <div className="flex flex-col justify-center mx-auto px-2 md:max-w-3xl my-5" >
        <h2 className="font-semibold text-xl mb-4">Comments({comments.length})</h2>
        {comments.length > 0 ? (
          comments.map((item, index) => {
            console.log(item)
            const profileURL=`http://localhost:5001/uploadProfileImage/${item.profileImage}`;
            
            return (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 p-4 rounded-3xl mb-3 shadow-sm w-sm md:w-lg "
            >
              <div className="flex gap-2">
                <img src={!item.profileImage?  assets.user_icon: profileURL} alt="" className='w-6 h-6 rounded-full'/>
                <p className="font-medium ">{!item.userName? "User":item.userName}</p>
              </div>
              <div className="flex justify-between">
                    <p className="text-gray-700 mt-1 text-sm sm:text-base ml-8">{item.comment}</p>
                  <p className="mt-1 text-gray-500  "> {Moment(item.createdAt).fromNow()}</p>
              </div>
              
            </div>
          )})
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

        {/* Add comment */}
      <div className="flex flex-col mx-auto justify-center max-w-3xl gap-3 px-2">
        <h2 className='rich-text font-medium'>Add Comment</h2>
        <form className='flex flex-col gap-5' onSubmit={handleAddComment}>
              <textarea placeholder='Enter Your Comment' value={comment} onChange={(e)=>setComment(e.target.value)} className='sm:w-100 w-70 h-40 border border-gray-300 rounded px-3 focus:outline-none' required></textarea>
              <button type='submit' className='border border-primary/25 rounded px-3 py-1 w-25 rounded bg-primary/20 hover:bg-primary/30 text-primary'>Add</button>
        </form>
      </div>
      
    </div>
  ):(
    <div>
      Loading......
    </div>
  )
}

export default Blog;
