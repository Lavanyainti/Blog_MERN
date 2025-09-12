import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 bg-primary/5 flex flex-col justify-center items-center">
      
      {/* Footer content */}
      <div className="w-full flex flex-col sm:flex-row justify-between gap-10 border-b border-gray-400 py-8 ">
        
        {/* Brand Info */}
        <div className="max-w-sm">
          <h5 className="text-xl font-semibold">QuickBlog</h5>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Placeat, sed sequi! Nesciunt, ut! Asperiores nostrum iusto
            mollitia officiis quis fugiat, assumenda, dolorem temporibus
            totam voluptatem ullam. Quas est sapiente delectus.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
          <ul className="space-y-2 text-gray-700">
            <li  to='/' className="cursor-pointer hover:text-primary"><Link to="/" >Home</Link></li>
            <li  className="cursor-pointer hover:text-primary">About</li>
            <li className="cursor-pointer hover:text-primary"><Link to="/blog" >Blogs</Link></li>
            <li className="cursor-pointer hover:text-primary">Contact</li>
          </ul>
        </div>

        {/* Extra Section (Optional, like Contact or Social Links) */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Follow Us</h5>
          <ul className="space-y-2 text-gray-700">
            <li className="cursor-pointer hover:text-primary">Facebook</li>
            <li className="cursor-pointer hover:text-primary">Twitter</li>
            <li className="cursor-pointer hover:text-primary">Instagram</li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="text-gray-500 py-4 text-center text-sm md:text-base">
        © 2025 QuickBlog - All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
