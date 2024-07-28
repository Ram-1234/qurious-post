import React, { useContext, useEffect,useState,createContext, useRef } from 'react'
import './style.css';
import user_img from "../assets/avatar.jpg";
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import UploadWidget from '../components/uploadWidget/Wrap';


const UserProfile = ({username,firstname, email,location,about,linkedin, github,twitter}) => {
    const [avatar, setAvatar]=useState(user_img);
    const navigate = useNavigate();
    const {currentUser, updateUser} = useContext(AuthContext);

    console.log('profile', currentUser);


    const updateProfile=()=>{
        navigate("/update_profile");
    }

    const contactMe=()=>{
        alert("conatct me")
    }

    
  return (
    <div className='profile_main_box container'>
        <div className='profile_top_box'>
            <h2>PROFILE</h2>
            {/* <p className='pt-2'>I'm a Creative {currentUser?.jobrole||"Software Engineer"}</p> */}
        </div>
        <div className='profile_bottom_box row-lg-12 justify-content-between'>
            {/* details */}
            <div className='profile_dettails col-lg-4'>
                <h2>DETAILS</h2>
                <div className='profile_details_info'>
                    <h4>Username</h4>
                    <p>{currentUser.username||"Ramnayan Yadav"}</p>
                    <h4>Email</h4>
                    <p>{currentUser.email||"ram123@gmail.com"}</p>
                    <h4>Location</h4>
                    <p>{location||"Chiraiyakot, Mau"}</p>
                </div>
                <Button
                    title={"Update"}
                    callback={updateProfile}
                />
            </div>
            {/* about */}
            <div className='profile_about col-lg-4'>
                <h2 className='m-0 p-0'>ABOUT ME</h2>
                <p className=''>I'm a Creative {currentUser?.jobrole||"Software Engineer"}</p>
                <h6 className='text-start ps-3 pb-2'>{currentUser?.about||"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}</h6>
                <Button title={'Contact Me'} callback={contactMe} />
            </div>
            {/* avatar */}
            <div className='profile_avatar col-lg-4' >
                <div className='avatar_box border' >
                    <img src={avatar} alt="avatar" />
                    <i className="bi bi-pencil-square" ></i>
                </div>
               {/* <UploadWidget/> */}
                <div className='bottom_info'>
                    <h4>{`Hello, I'M ${currentUser.username||"RAM"}`}</h4>
                    <p>{currentUser?.about||"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}</p>
                    <div className='social_media'>
                        <i style={{...styles.socialMediaIcon,width:"100px", height:"50px"}} className="bi bi-linkedin social_icon"></i>
                        <i style={{...styles.socialMediaIcon,width:"100px", height:"50px"}} className="bi bi-github social_icon"></i>
                        <i style={{...styles.socialMediaIcon,width:"100px", height:"50px"}} className="bi bi-twitter social_icon"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile;

const styles={
    socialMediaIcon:{
        width:"100px",
        height:"100px",
        margin:"0 0.5rem"
    }
}