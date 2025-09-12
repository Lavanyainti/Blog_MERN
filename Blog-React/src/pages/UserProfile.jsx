import React, { useEffect, useState } from 'react';
import axiosInstance from '../Middleware/Middleware';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/QuickBlog-Assets/assets';

const UserProfile = () => {
  const { id } = useParams();
  console.log(id)
  const [userProfile, setUserProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const getProfileResult = await axiosInstance().get(`/getProfileByUserToUser/${id}`);
        console.log(getProfileResult)
        if (getProfileResult.status===200) {
          setUserProfile(getProfileResult.data.getUsersResult[0]);
        }
      } catch (err) {
        toast.error(err.response?.data?.message)
        console.log(err)
      }
    };

    const getBlogs = async () => {
      try {
        const getBlogsResult = await axiosInstance().get(`/getBlogByUserToUser/${id}`);
        console.log(getBlogsResult)
        if (getBlogsResult.status === 200) {
          setUserBlogs(getBlogsResult.data.getBlogByUserToUserResult);
        }
      } catch (err) {
        toast.error(err.response?.data?.message);
        console.log(err)
      }
    };

    getProfile();
    getBlogs();
  }, [id]);

  return (
    <div className="p-5 flex flex-col items-center justify-center gap-4">
      {userProfile ? (
        <>
          <div>
            <img
              src={
                userProfile.profileImage
                  ? `http://localhost:5001/uploadProfileImage/${userProfile.profileImage}`
                  : assets.user_icon
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-primary">{userProfile.userID}</h1>
          <p className="text-lg text-primary font-medium">{userProfile.userName}</p>
          <p className="text-primary/80 text-center max-w-md">{userProfile.profileDesciption}</p>
        </>
      ) : (
        <p className="text-primary">Loading profile...</p>
      )}

     {
         <div className="flex flex-wrap justify-center gap-6 mt-8">
      {userBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        userBlogs.map((blog) => {
          const imageUrl2 = `http://localhost:5001/uploads/${blog.thumbnailImage}`;
          return (
            <div key={blog._id} onClick={()=>{navigate(`/blog/${blog._id}`)}} className="w-72 hover:scale-105 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white hover:cursor-pointer">{/*we fixed that path in app.jsx */}
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
     }
    </div>
  );
};

export default UserProfile;
