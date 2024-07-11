import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import apiRequest from '../../lib/apiRequest';
import { useNavigate,useLocation } from 'react-router-dom';
import Gallery from '../gallery/gallery';
import { themeStyle } from '../../common/common';


import Modal from '../modal/modal';

const CreatePost = (props) => {
    const [edit, setEdit]=useState(true);
    const {currentUser, updateUser, url, modal,setURLHandler, setModalHandler} = useContext(AuthContext);
   
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreatePost=async()=>{
        let title = document.getElementById('post_title').innerText;
        let story = document.getElementById('post_story').innerText;
       
        let bodyData = {title:title,story:story,theme:url, authorId:currentUser.id}
        
        if(title==='Title'){
          alert('enter valid title');
          return;
        }

        if(story==='Tell your story'){
          alert('enter valid story');
          return
        }


        try {
          if(location.state && location.state.id){
            let updatedPost = await apiRequest.put(`post/${location.state.id}`, bodyData);
            if(updatedPost.status==200){
              navigate(`/single_post/${location.state.id}`);
              setURLHandler('');
            }else{
              console.error('err');
            }
            return;

          }

            let response = await apiRequest.post(`post/create`, bodyData);
            if(response.status===200){
              navigate(`/single_post/${response.data.data.id}`);
              setURLHandler('');
            }
            setEdit(false)
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div id="create_post_id" className='creat-post container w-75 border mt-4 p-4'>
        <h3 className='post-title pt-2 pb-2' suppressContentEditableWarning={true}  id='post_title' contentEditable={edit}> { location.state && location.state.title ||  "Title"}</h3>
        {url.length ? <img src={url} alt="theme" style={themeStyle} /> : <button onClick={()=>setModalHandler(true)} className='btn btn-danger mt-2 mb-2'>Upload <i class="bi bi-card-image"></i></button>}
        <p className='post-story pt-2 pb-2' suppressContentEditableWarning={true}  id='post_story' contentEditable={edit}>{location.state && location.state.story ||"Tell your story"}</p>
        <div><button id="publish_button" disabled={!edit} onClick={handleCreatePost} type='button' className='btn btn-success'>Publish</button></div>
        {modal && <Modal Element={Gallery} title="Gallery" closeHandle={setModalHandler} />}
    </div>
  )
}

export default CreatePost;