/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import "./style.css";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import UserProfile from '../components/user-profile';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/auth-context';
import noavatar from "../assets/noavatar.jpeg";


const Navbar = () => {
    const {currentUser, updateUser} = useContext(AuthContext);
    const [profilePic, setProfilePic] = React.useState('');

    const navigate = useNavigate();
    //console.log("user", currentUser);
    useEffect(()=>{

         (async()=>{
            try {
                const res = await apiRequest.get(`/users/${currentUser.id}`);
                //console.log("res",res);
                //setUpdate(false);
                const {avatar, ...restInfo}= res.data;
                setProfilePic(avatar)
                //console.log('user', res.data);
                //updateUser(restInfo);
            } catch (error) {
                console.log(error)
            }
        })();


        if(!currentUser){
            navigate("/");
        }
        //eslint-disabled
    },[currentUser]);

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
    <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
            {/* putting prev navbar  */}
            <div className="container d-flex align-items-center justify-content-between">
                <NavLink className="navbarr-brand w-25 d-flex" to="/"><i className="bi bi-bullseye"></i> Curious</NavLink>
                <div className="collapse navbar-collapse d-xxl-flex d-xl-flex d-lg-flex justify-content-end d-sm-none d-md-none" id="navbarSupportedContent">
                    <ul className="navbar-nav w-50 mb-2 mb-lg-0 d-flex flex-row align-items-center justify-content-evenly">
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
                        <li className="nav-item dropdown user-dropdown-menu">
                            <NavLink className="nav-link dropdown-toggle d-flex align-items-center text-light" href="x" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {<UserProfile avatar={profilePic || noavatar} />||<FaRegUserCircle/>} <span style={{textTransform:"capitalize", fontSize:"1rem", fontWeight:"600"}}>{(currentUser && currentUser?.username)||"User"}</span>
                        </NavLink>
                        <ul className="dropdown-menu user-registration-dropwdonw">
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
            {/*  */}
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Curious</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body" style={{background:"#b61924"}}>
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
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
        </div>
    </nav>
  )
}

export default Navbar;