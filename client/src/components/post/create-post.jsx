import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { Navigate } from '../../helper';
import Gallery from '../gallery/gallery';
import { useSelector, useDispatch } from 'react-redux'
import { uploadURL } from '../../app/features/uploadURLSlice';
import { themeStyle } from '../../common/common';

import Modal from '../modal/modal';

const CreatePost = () => {
    const [edit, setEdit]=useState(true);
    const {currentUser, updateUser, url, modal,setURLHandler, setModalHandler} = useContext(AuthContext);
    //const [modal, setModal]=useState(false);

  
    //const url = useSelector((state)=> state.url)
    //console.log('url loaded ', url)

    const navigate = useNavigate();

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
            let response = await apiRequest.post(`post/create`, bodyData);
            //console.log('response', response);
            if(response.status===200){
              navigate(`/single_post/${response.data.data.id}`);
              setURLHandler('')
            }
            setEdit(false)
        } catch (error) {
            console.log(error)
        }
    }

    //const themeStyle={width:"100%", height:"600px",objectFit: "cover", border:"2px solid green"}
    
  return (
    <div id="create_post_id" className='creat-post container w-75 border mt-4 p-4'>
        <h3 className='post-title' suppressContentEditableWarning={true}  id='post_title' contentEditable={edit}> Title</h3>
        {url.length ? <img src={url} alt="theme" style={themeStyle} /> : <button onClick={()=>setModalHandler(true)} className='btn btn-danger mt-2 mb-2'>Upload <i class="bi bi-card-image"></i></button>}
        <p className='post-story' suppressContentEditableWarning={true}  id='post_story' contentEditable={edit}>Tell your story</p>
        <div><button id="publish_button" disabled={!edit} onClick={handleCreatePost} type='button' className='btn btn-success'>Publish</button></div>
        {modal && <Modal Element={Gallery} title="Gallery" closeHandle={setModalHandler} />}
    </div>
  )
}

export default CreatePost;