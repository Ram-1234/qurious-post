import React, { useContext, useEffect, useState } from 'react';
import "./style.css";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import UserProfile from '../components/user-profile';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/auth-context';
import noavatar from "../assets/noavatar.jpeg";

//profile

const Navbar = () => {
    const {currentUser, updateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!currentUser){
            navigate("/");
        }
    },[currentUser])

    const handleLogout=async()=>{
        try {
            //alert('logout')
            await apiRequest.post("/auth/logout");
            //console.log('logout', response);
            updateUser(null);
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    console.log("currentUser?.username", currentUser?.username)
 
  return ( 
    <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
            <a className="navbar-brand text-light" href="x">Realstate</a>
            <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="xnavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-light"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <form className="d-flex visually-hidden" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center borde">
                    <li className="nav-item">
                    <NavLink className="nav-link active text-light" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/agents">Agents</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle d-flex align-items-center text-light" href="x" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {<UserProfile avatar={currentUser?.avatar || noavatar} />||<FaRegUserCircle/>} <span style={{textTransform:"capitalize", fontSize:"0.8rem", fontWeight:"600"}}>{currentUser?.username||"User"}</span>
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