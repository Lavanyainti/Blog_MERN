const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const UserRoute=require('./routes/userRoute');
const AddBlog=require('./routes/addBlogRoute')
const commentRoute=require('./routes/commentRouter')
const profileRoute=require('./routes/profileRoute')
const path = require('path');

app.use(cors());
app.use(express.json());
const port=process.env.PORT || 5001;

app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`)
})

app.use('/api',UserRoute)
app.use('/api',AddBlog)
app.use('/api',commentRoute)
app.use('/api',profileRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/UploadProfileImage',express.static(path.join(__dirname,'UploadProfileImage')));
mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log("DB connected succesfully")
}).catch(err=>{
    console.log(err)
})