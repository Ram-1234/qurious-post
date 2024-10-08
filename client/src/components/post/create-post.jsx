import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import apiRequest from '../../lib/apiRequest';
import { useNavigate,useLocation } from 'react-router-dom';
import Gallery from '../gallery/gallery';
import { themeStyle } from '../../common/common';
import Modal from '../modal/modal';



const CreatePost = (props) => {
    const [edit, setEdit]=useState(true);
    const {currentUser, url, modal,setURLHandler,loading,setLoading, setModalHandler} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleCreatePost=async()=>{
        let title = document.getElementById('post_title').innerText;
        let story = document.getElementById('post_story').value;
        //debugger
        let bodyData = {title:title,story:story,theme:url||location?.state?.theme, authorId:currentUser.id}
        setLoading(true)
        if(title==='Title'){
          alert('enter valid title');
          return;
        }

        if(story==='Tell your story'){
          alert('enter valid story');
          return
        }


        try {
          setLoading(true)
          if(location.state && location.state.id){
            let updatedPost = await apiRequest.put(`post/${location.state.id}`,bodyData);
            if(updatedPost.status===200){
              navigate(`/single_post/${location.state.id}`);
              setURLHandler('');
              setLoading(false)
            }else{
              console.error('err');
              setLoading(false)
            }
            return;

          }

            let response = await apiRequest.post(`post/create`, bodyData);
            if(response.status===200){
              navigate(`/single_post/${response.data.data.id}`);
              setURLHandler('');
              setLoading(false)
            }
          } catch (error) {
            setEdit(false)
            console.log(error);
        }
    }
    
  return (
    <div id="create_post_id" className='creat-post container w-75 border mt-4 p-4'>
        <h3 className='post-title pt-2 pb-2' suppressContentEditableWarning={true}  id='post_title' contentEditable={edit}> { location.state && location.state.title ||  "Title"}</h3>
        {(url.length || location?.state?.theme) ? <img src={url || location.state.theme} alt="theme" style={themeStyle} /> : <button onClick={()=>setModalHandler(true)} className='btn btn-danger mt-2 mb-2'>Upload <i className="bi bi-card-image"></i></button>}
        {/* <p className='post-story pt-2 pb-2' suppressContentEditableWarning={true}  id='post_story' contentEditable={edit}>{location.state && location.state.story ||"Tell your story"}</p> */}
        <textarea rows={10} style={{width:"100%", margin:"1rem 0", padding:'1rem', border:"0.5px solid #727272"}} defaultValue={location.state && location.state.story} className='post-story pt-2 pb-2' suppressContentEditableWarning={true}  id='post_story' contentEditable={edit}/>
        <div><button id="publish_button" disabled={!edit} onClick={handleCreatePost} type='button' className='btn btn-success'>Publish</button></div>
        {modal && <Modal Element={Gallery} title="Gallery" closeHandle={setModalHandler} />}
    </div>
  )
}

export default CreatePost;