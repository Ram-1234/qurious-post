import {Routes,Route} from 'react-router-dom';
import React from 'react';
import  
{
  About,
    Home,
    Footer,
    Button,
    Contact,
    Agents
  }   from './pages';
import {
  Register, 
  PrivateRoute,
  ChatApp, 
  Login, 
  User, 
  UpdateProfile, 
  CreatePost, 
  ListofPosts,
  SingleFullPost, 
  OurStory, 
  UserPostProfile,
  News,
  UserProfile
} from './components';



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
        <Route path="/ai_chat" exact element={<ChatApp/>}/>
        {/* <Route path="/websearch" exact element={<WebBrowser/>}/> */}
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