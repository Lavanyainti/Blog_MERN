import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UserBlogPage from './pages/UserBlogPage'
import { Toaster } from 'react-hot-toast';
import {getUser, isTokenExpired, getRegisterUser} from './Utility/getUser'
import BlogUsers from './pages/BlogUsers'
import Profile from './pages/Profile'
import ViewProfile from './pages/ViewProfile'
import AddBlog from './pages/AddBlog'
import UserProfile from './pages/UserProfile'
import AllBlogs from './pages/AllBlogs'
import BlogList from './components/BlogList'
import SearchBlog from './components/SearchBlog'
import Comments from './pages/Comments'

const App = () => {
  const navigate=useNavigate();
  const [userData, setUserData]=useState(()=>getUser());
  return (
    <div>
      <Navbar userData={userData} setUserData={setUserData}/>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>
        <Route path='/login' element={<Login setUserData={setUserData}/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/blogusers' element={<BlogUsers/>}></Route>
        <Route path='/userblogpage' element={<UserBlogPage/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/userProfile/:id' element={<UserProfile/>}></Route>
        <Route path='/viewProfile' element={<ViewProfile/>}></Route>
        <Route path='/allblogs' element={<AllBlogs/>}></Route>
        <Route path='/bloglist' element={<BlogList userData={userData} />}></Route>
        <Route path='/searchblog' element={<SearchBlog/>}></Route>
        <Route path='/comments' element={<Comments/>}></Route>
      </Routes>
    </div>
  )
}

export default App
