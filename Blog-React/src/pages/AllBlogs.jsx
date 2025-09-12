import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Middleware/Middleware';


const AllBlogs = () => {
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

  

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {allBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        allBlogs.map((blog) => {
          const imageUrl = `http://localhost:5001/uploads/${blog.thumbnailImage}`;
          return (
            <div key={blog._id} onClick={() => { navigate(`/blog/${blog._id}`); }} className="sm:w-72 w-50 text-sm sm:text-base hover:scale-105 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white hover:cursor-pointer">{/*we fixed that path in app.jsx */}
              <img src={imageUrl} alt="Blog" className="aspect-video w-full " />
              <span className="ml-5 mt-3 inline-block py-1 sm:py-2 px-3 bg-primary/40 rounded-full">{blog.category}</span>
              <div className="p-5 h-30 overflow-y-auto">
                <h5 className="mb-2 font-medium text-gray-900">{blog.title}</h5>
                <p className="mb-3 text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllBlogs;
