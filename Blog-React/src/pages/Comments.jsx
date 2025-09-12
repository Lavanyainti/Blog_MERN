import React, { useEffect, useState } from 'react'
import { AiOutlineDelete} from 'react-icons/ai';
import toast from 'react-hot-toast';
import axiosInstance from '../Middleware/Middleware';
const Comments = () => {
  const [comments,setComments]=useState([]);

  useEffect(()=>{
      const fetchComments=async ()=>{
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
      fetchComments();

  },[])
  const handleDeleteComment=async(commentID)=>{
            try{
                const delet=await axiosInstance().delete(`/deleteComment/${commentID}`)
                if(delet.status===200){
                  toast.success("Deleted successfully")
                  setComments(prev=> prev.filter(commentByID=>commentByID._id!==commentID))
                }
            }catch(err){
              toast.error("can't delete")
            }
  }
    return (
    <div className="flex flex-col items-center gap-4 mt-10">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
        comments.map((comment) => (
         <div key={comment._id} className="flex justify-center flex-col sm:flex-row gap-2 sm:gap-5 text-sm sm:text-base w-full  px-2" >
                {/* Blog Title */}
                <div className="bg-primary/5 rounded bgShadow2 px-3 py-2 flex items-center justify-center text-center sm:w-60 w-full">
                  <h4 className="text-primary truncate"><span className='font-medium'>Blog: </span>{comment.blogTitle}</h4>
                </div>

                {/* Comment Box */}
                <div className="bg-primary/5 rounded bgShadow2 px-4 py-2 flex items-center justify-between  sm:w-180  ">
                  <div className="flex flex-col text-white  sm:w-150">
                    <h5 className="text-primary/70 font-semibold">{comment.userName}</h5>
                    <p className="text-gray-400 break-words">{comment.comment}</p>
                  </div>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <AiOutlineDelete
                      size={20}
                      className="text-gray-500 hover:text-red-600 hover:cursor-pointer ml-2"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
      </div>
  )
}

export default Comments
