import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import Avatar from '../../profile/avatar';
import { When } from '../../helper';
import { timeFormat } from '../../common/common';
import "./style.css";

const SingleFullPost = () => {
    let [storyData,setStory]=useState(null);
    let [userData,setUserData]=useState(null);


    const params = useParams();

    useEffect(()=>{
        (async()=>{
            let data = await apiRequest.get(`/post/${params?.id}`);
            if(data.status===200){
                let userRes = await apiRequest.get(`/users/${data.data.post.authorId}`);
                
                if(userRes.status===200){
                    setUserData(userRes.data);
                }
                setStory(data.data.post);
            }
        })()
    },[params.id])

  return (
    <div className='conatiner w-75 ps-5 pe-5 mx-auto'>
        <div className='single_post_user_info d-flex align-items-center' >
            <Avatar title={userData?.username.slice(0,1)} />
            <div className='m-3 m-1'>
                <h6 className='m-1 single_post_username mt-0 mb-0'>{userData?.username|| "User"}</h6>
                <p className='m-1 mt-0 mb-0'>{timeFormat(userData?.createAt, "MM DD, YY HH:MM:SS EN")}</p>
            </div>
        </div>
        <div>
            <hr className=''/>
                <div className='d-flex align-content-center justify-content-between'>
                    <div className='left'>
                    <i class="bi single_post_icon bi-chat-dots"></i>
                    <i class="bi single_post_icon bi-hand-thumbs-up"></i>
                    <i class="bi single_post_icon bi-bookmark-plus"></i>
                    </div>
                    <div className='right'>
                    <i class="bi single_post_icon bi-play-circle"></i>
                    <i class="bi single_post_icon bi-file-arrow-up"></i>
                    <i class="bi single_post_icon bi-three-dots"></i>
                    </div>
                </div>
            <hr className=''/>
        </div>
        <h3 className='single_post_title'>{storyData?.title||"Title"}</h3>
        <p className='single_post_story'>{storyData?.story||"Story..."}</p>
    </div>
  )
}

export default SingleFullPost;