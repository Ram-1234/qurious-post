import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import Avatar from '../../profile/avatar';
import { When } from '../../helper';
import { AuthContext } from '../../context/auth-context';

const SingleFullPost = () => {
    let [storyData,setStory]=useState(null);
    let [userData,setUserData]=useState(null);
    //const {currentUser, updateUser} = useContext(AuthContext);

    //console.log('story', storyData)
    //console.log('userdata', userData);

    const params = useParams();
    //console.log("params", params.id);

    useEffect(()=>{
        (async()=>{
            let data = await apiRequest.get(`/post/${params?.id}`);
            //console.log('data', data);
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
            <Avatar/>
            <div className='m-3 m-1'>
                <h6 className='m-1 mt-0 mb-0'>{userData?.username|| "User"}</h6>
                <p className='m-1 mt-0 mb-0'>{When(userData?.createAt) || "date"}</p>
            </div>
        </div>
        <div>
            <hr className=''/>
                <div className='d-flex align-content-center'>
                <i class="bi bi-chat-dots"></i>
                <i class="bi bi-hand-thumbs-up"></i>
                <i class="bi bi-bookmark-plus"></i>
                <i class="bi bi-play-circle"></i>
                <i class="bi bi-file-arrow-up"></i>
                <i class="bi bi-three-dots"></i>
                </div>
            <hr className=''/>
        </div>
        <h3>{storyData?.title||"Title"}</h3>
        <p>{storyData?.story||"Story..."}</p>
    </div>
  )
}

export default SingleFullPost;