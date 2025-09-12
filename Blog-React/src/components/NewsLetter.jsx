import React from 'react'

const NewsLetter = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 my-20">
      <h1 className='text-2xl md:text-4xl font-semibold'>Never Miss A Blog.!</h1>
      <p className='text-gray-500'>Subscribe to get the latest blog, new tech ans exclusive news.</p>
      <form className='flex justify-between border border-gray-200 rounded-lg max-w-sm sm:w-full  '>
        <input type="text" placeholder='Enter your Email Id' required className=' px-4 py-2 rounded-lg focus:outline-none'/>
        <button className=' px-4 py-2 bg-primary/70 text-white'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter;
