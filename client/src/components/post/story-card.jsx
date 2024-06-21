import React from 'react';
import Avatar from '../../profile/avatar';
import { useNavigate } from 'react-router-dom';
import { timeFormat } from '../../common/common';

const StoryCard = ({title, story, user,createdAt, id}) => {
    const navigate = useNavigate();

    const avatartStyle={
        width:"45px",
        height:"45px",
    }

    const storyClicked=(id)=>{
        //console.log('id', id);
        navigate(`/single_post/${id}`);
    }
    
  return (
        <div className='story_card_wrap' onClick={()=>storyClicked(id)}>
            <div className='story_card'>
                <div className='user_profile d-flex align-items-center mb-2'>
                    <Avatar url="" title={(user?.username && user.username.slice(0,1))||"U"} propsStyle={avatartStyle} />
                    <h5 className='user_name_story m-1 mt-0 mb-0'>{user?.username||"User"}</h5>
                    <p className='created_at_story m-1 mt-0 mb-0'>{timeFormat(createdAt,"MM DD, YY HH:MM:SS EN")}</p>
                </div>
                <div className='user_story'>
                    <h1 className='story_title mb-2'>{title||"What is react"}</h1>
                    <p className='story_description'>{story.length>450 ? story.slice(0,450)+"...":story||"evrything about react"}</p>
                </div>
            </div>
        </div>
  )
}

export default StoryCard;