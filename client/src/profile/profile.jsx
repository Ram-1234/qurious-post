import React, { useContext, useEffect } from 'react'
import './style.css';
import avatar from "../assets/avatar.jpg";
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const UserProfile = ({username,firstname, email,location,about,linkedin, github,twitter}) => {
    const navigate = useNavigate();
    const {currentUser, updateUser} = useContext(AuthContext);

    const updateProfile=()=>{
        navigate("/update_profile");
    }

    const contactMe=()=>{
        alert("conatct me")
    }
    
  return (
    <div className='profile_main_box container'>
        <div className='profile_top_box'>
            <h2>Profile</h2>
            <p>I'm a Creative Web Developer</p>
        </div>
        <div className='profile_bottom_box row-lg-12 justify-content-between'>
            <div className='profile_dettails col-lg-4'>
                <h2>Details</h2>
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
            <div className='profile_about col-lg-4'>
                <h2>About Me</h2>
                <p>{about||"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}</p>
                <Button title={'Contact Me'} callback={contactMe} />
            </div>
            <div className='profile_avatar col-lg-4'>
                <div className='avatar_box'>
                    <img src={avatar} alt="avatar" />
                    <i class="bi bi-card-image"></i>
                    </div>
                <div className='bottom_info'>
                    <h4>{`Hello, I'M ${currentUser.username||"RAM"}`}</h4>
                    <p>{about||"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}</p>
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