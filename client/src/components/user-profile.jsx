import React from 'react';
import noavatar from "../assets/noavatar.jpeg";

const UserProfile = ({avatar,styles}) => {

    const imageStyles={
        image:{
            width:"100%",
            height:"100%",
            padding:"2px",
            border:"0.5px solid #727272", 
            borderRadius:"50%",
            objectFit:"cover"
            },
        imageBox:{
            width:"3.2rem",
            height:"3.2rem",
            marginRight:"0.5rem"
            }
    }
  return (
   <div style={imageStyles.imageBox}>
    <img src={avatar||noavatar} style={imageStyles.image} alt='user profile'/>
   </div>
  )
}

export default UserProfile;