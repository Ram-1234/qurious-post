import React from 'react';
import Avatar from '../../profile/avatar';
import { useNavigate } from 'react-router-dom';
import { When } from '../../helper';

const StoryCard = ({title, story, user,createdAt, id}) => {
    const navigate = useNavigate();

    const avatartStyle={
        width:"30px",
        height:"30px",
    }
    //let create_at = new Date(createdAt).toGMTString();

    const storyClicked=(id)=>{
        //console.log('id', id);
        navigate(`/single_post/${id}`);
    }
    
  return (
        <div className='story_card_wrap' onClick={()=>storyClicked(id)}>
            <div className='story_card'>
                <div className='user_profile d-flex align-items-center'>
                    <Avatar url="" title={(user?.username && user.username.slice(0,1))||"U"} propsStyle={avatartStyle} />
                    <p className='user_name_story m-1 mt-0 mb-0'>{user?.username||"User"}</p>
                    <p className='created_at_story m-1 mt-0 mb-0'>{When(createdAt)||"March 29, 2024"}</p>
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