import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Register from './users/register';
import Login from './users/login';
import User from './users/user';
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Agents from "./components/agents";
import {PrivateRoute} from './layout/private';
import UserProfile from './profile/profile';
import UpdateProfile from './profile/update-profile';


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
    <Route path="/update_profile" exact element={<UpdateProfile/>} />
   </Routes>
  )
}

function RoutePage1(){
  const HocLogin = <User><Login/></User>
  const HocRegister = <User><Register/></User>
  
  return (
   <Routes>
    <Route element={<PrivateRoute/>}>
      <Route path="/about" exact element={<About/>} />
      <Route path="/contact" exact element={<Contact/>} />
      <Route path="/agents" exact element={<Agents/>} />
      <Route path="/profile" exact element={<UserProfile/>} />
      <Route path="/update_profile" exact element={<UpdateProfile/>} />
    </Route>
      <Route path="/" exact element={<Home/>} />
      <Route path="/register" exact element={HocRegister} />
      <Route path="/login" exact element={HocLogin} />
   </Routes>
  )
}


export {RoutePage, RoutePage1};