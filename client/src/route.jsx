import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Register from './users/register';
import Login from './users/login';
import LandingPage from './components/landing-page';
import User from './users/user';
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Agents from "./components/agents";
import Private from './layout/private';


const RoutePage = () => {
  const HocLogin = <User><Login/></User>
  const HocRegister = <User><Register/></User>
  
  return (
   <Routes>
    <Route path="" exact element={<LandingPage/>} />
    <Route path="/user/register" exact element={HocRegister} />
    <Route path="/user/login" exact element={HocLogin} />
    <Route path="/home" exact element={<Home/>} />
    <Route path="/about" exact element={<About/>} />
    <Route path="/contact" exact element={<Contact/>} />
    <Route path="/agents" exact element={<Agents/>} />
   </Routes>
  )
}

export default RoutePage