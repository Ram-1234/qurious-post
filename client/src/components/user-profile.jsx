import React from 'react';
import user from '../assets/user.jpeg';

const UserProfile = ({avatar,styles}) => {

    const imageStyles={
        image:{
            width:"100%",
            height:"100%",
            padding:"5px",
            border:"0.5px solid #727272", 
            borderRadius:"50%",
            objectFit:"cover"
            },
        imageBox:{
            width:"2.6rem",
            height:"2.6rem",
            marginRight:"0.5rem"
            }
    }
  return (
   <div style={imageStyles.imageBox}>
    <img src={avatar||user} style={imageStyles.image} alt='user profile'/>
   </div>
  )
}

export default UserProfile;