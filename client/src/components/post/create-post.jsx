import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { Navigate } from '../../helper';

const CreatePost = () => {
    const [edit, setEdit]=useState(true);
    const {currentUser, updateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleCreatePost=async()=>{
        let title = document.getElementById('post_title').innerText;
        let story = document.getElementById('post_story').innerText;
      
        let bodyData = {title:title,story:story,authorId:currentUser.id}
        try {
            let response = await apiRequest.post(`post/create`, bodyData);
            console.log('response', response);
            if(response.status===200){
              navigate(`/single_post/${response.data.data.id}`);
            }
            setEdit(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='creat-post container w-75 border mt-4 p-4'>
            <h3 className='post-title' id='post_title' contentEditable={edit}> Title</h3>
            <p className='post-story' id='post_story' contentEditable={edit}>Tell your story</p>
            {/* <div><textarea type="text" placeholder='Title' rows={3} required={true} /></div> */}
            {/* <div><textarea type="text" placeholder='Describe your story...' rows={5} required={true} /></div> */}
            <div><button disabled={!edit} onClick={handleCreatePost} type='button' className='btn btn-success'>Publish</button></div>
    </div>
  )
}

export default CreatePost;