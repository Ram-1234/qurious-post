import React, { useEffect, useState } from 'react';
import Avatar from '../../profile/avatar';
import apiRequest from '../../lib/apiRequest';

const StoryCard = ({title, story, user,createdAt,autherId}) => {
    const [userData, setUserData]=useState(null);
    console.log('user id', autherId);

    const avatartStyle={
        width:"30px",
        height:"30px",
    }
    let create_at = new Date(createdAt).toGMTString();

    useEffect(()=>{
        (async()=>{
            try {
                let userRes = await apiRequest.get(`/users/${autherId}`);
                console.log('user get', userRes)
    
            } catch (error) {
                console.log(error)
            }
        })()
    },[autherId])
    
  return (
        <div className='story_card_wrap'>
            <div className='story_card'>
                <div className='user_profile d-flex align-items-center'>
                    <Avatar url="" title={"U"} propsStyle={avatartStyle} />
                    <p className='user_name_story m-1 mt-0 mb-0'>{user||"User"}</p>
                    <p className='created_at_story m-1 mt-0 mb-0'>{create_at||"March 29, 2024"}</p>
                </div>
                <div className='user_story'>
                    <h3 className='story_title'>{title||"What is react"}</h3>
                    <p className='story_description'>{story||"evrything about react"}</p>
                </div>
            </div>
        </div>
  )
}

export default StoryCard;