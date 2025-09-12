import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../Utility/getUser';
import toast from 'react-hot-toast';

const SearchBlog = () => {
    const location=useLocation();
    const {results=[], query=""}=location.state || {}
    const navigate=useNavigate()

  return (
    <div className="mx-8 sm:mx-24 mt-10">
      <h2 className="text-2xl font-bold mb-10">
        Results for: <span className="text-primary">"{query}"</span>
      </h2>

      {results.length > 0 ? (
        <div className="grid gap-6">
          { results.map((blog) => {
          const imageUrl = `http://localhost:5001/uploads/${blog.thumbnailImage}`;
          return (
            <div key={blog._id} className="w-72 hover:scale-105 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white">{/*we fixed that path in app.jsx */}
              <img src={imageUrl} alt="Blog" className="aspect-video w-full " />
              <span className="ml-5 mt-3 inline-block py-1 sm:py-2 px-3 bg-primary/40 rounded-full">{blog.category}</span>
              <div className="p-5 h-30 overflow-y-auto">
                <h5 className="mb-2 font-medium text-gray-900">{blog.title}</h5>
                <p className="mb-3 text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          );
        })}
        </div>
      ) : (
        <p className="text-gray-500">No blogs found.</p>
      )}
    </div>
  )
}

export default SearchBlog
