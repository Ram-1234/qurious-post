import React, { useContext, useEffect, useState } from 'react';
import "./style.css";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import UserProfile from '../components/user-profile';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/auth-context';
import noavatar from "../assets/noavatar.jpeg";



const Navbar = () => {
    const {currentUser, updateUser} = useContext(AuthContext);
        //console.log('currentUser', currentUser);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!currentUser){
            navigate("/");
        }
    },[currentUser])

    const handleLogout=async()=>{
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
 
  return ( 
    <nav className="navbar navbar-expand-lg">
        <div className="container">
            <NavLink className="navbarr-brand" to="/"> <i className="bi bi-bullseye"></i> Curious</NavLink>
            <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="xnavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon text-light"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0 d-flex align-items-center">
                    <li className="nav-item">
                    <NavLink className="nav-link active text-light" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to={`/our_story/${currentUser?.id}`}>Our Story</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/create_post">
                    <i className="bi bi-pencil-square"></i> Write
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/ai_chat">
                    <i className="bi bi-discord"></i> AI 
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/agents">
                    <i className="bi bi-bell"></i>                       
                    </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle d-flex align-items-center text-light" href="x" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {<UserProfile avatar={currentUser?.avatar || noavatar} />||<FaRegUserCircle/>} <span style={{textTransform:"capitalize", fontSize:"1rem", fontWeight:"600"}}>{(currentUser && currentUser?.username)||"User"}</span>
                    </NavLink>
                   
                    <ul className="dropdown-menu">
                       {!currentUser?.username ? <>
                        <li><NavLink className="dropdown-item" to="/login">Log in</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/register">Sign up</NavLink></li>
                        </>
                    :
                     <>
                     <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li className="dropdown-item" onClick={handleLogout} style={{cursor:"pointer"}}>Logout</li>
                     </>}
                     </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;