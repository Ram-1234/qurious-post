import {Routes,Route} from 'react-router-dom';
import React from 'react';
import UserPostProfile from './components/post/user-post-profile';
import SingleFullPost from './components/post/single-post';
import ListofPosts from './components/post/listing-post';
import CreatePost from './components/post/create-post';
import UpdateProfile from './profile/update-profile';
import OurStory from './components/post/your-story';
import {PrivateRoute} from './layout/private';
import UserProfile from './profile/profile';
import Contact from "./components/contact";
import Agents from "./components/agents";
import Register from './users/register';
import About from "./components/about";
import AIChat from './AI/view/message';
import Home from "./components/home";
import Login from './users/login';
import User from './users/user';
import News from './components/news/News';
// import UploadWidget from './uploadWidget/UploadWidget';


const RoutePage = () => {
  const HocLogin = <User><Login/></User>
  const HocRegister = <User><Register/></User>
 
  
  return (
   <Routes>
    <Route path="/register" exact element={HocRegister} />
    <Route path="/login" exact element={HocLogin} />
    <Route path="/home" exact element={<Home/>} />
    <Route path="/about" exact element={<About/>} />
    <Route path="/contact" exact element={<Contact/>} />
    <Route path="/agents" exact element={<Agents/>} />
    <Route path="/profile" exact element={<UserProfile/>} />
    <Route path="/update_profile/:id" exact element={<UserPostProfile/>} />
   </Routes>
  )
}

function RoutePage1(){
  const HocLogin = <User><Login/></User>
  const HocRegister = <User><Register/></User>
  
  return (
   <Routes>
      {/* private route */}
      <Route element={<PrivateRoute/>}>
        <Route path="/contact" exact element={<Contact/>} />
        <Route path="/agents" exact element={<Agents/>} />
        <Route path="/profile" exact element={<UserProfile/>} />
        <Route path="/update_profile" exact element={<UpdateProfile/>} />
        <Route path="/create_post" exact element={<CreatePost/>}/>
        <Route path="/posts" exact element={<ListofPosts/>}/>
        <Route path="/single_post/:id" exact element={<SingleFullPost/>}/>
        <Route path="/our_story/:id" exact element={<OurStory/>}/>
        <Route path="/user_post_profile/:id" exact element={<UserPostProfile/>}/>
        <Route path="/ai_chat" exact element={<AIChat/>}/>
      </Route>
      {/* public route */}
      <Route path="/" exact element={<Home/>} />
      <Route path="/about" exact element={<About/>}/>
      <Route path="/news" exact element={<News/>}/>
      <Route path="/register" exact element={HocRegister} />
      <Route path="/login" exact element={HocLogin} />
   </Routes>
  )
}


export {RoutePage, RoutePage1};