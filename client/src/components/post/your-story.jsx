import React, { useContext, useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import StoryCard from './story-card';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const OurStory = () => {
    const [postData, setData]=useState([]);
    const [loading, setLoading]=useState(false);
    const [userData, setUserData]=useState(null);
    const {currentUser, updateUser} = useContext(AuthContext);

    //console.log('postData', postData);
    const params = useParams();
    //console.log('params', params);

    useEffect(()=>{
        (async()=>{
            setLoading(true);
            try {
                let res = await  apiRequest.get(`/post/posts/${params.id}`);
                //console.log('res', res);
                if(res.status===200){
                    setData(res.data.data);
                    setLoading(true);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
          
        })()
    },[])


    useEffect(()=>{
            (async()=>{
                try {
                    let userRes = await apiRequest.get(`/users/666589034122e4bc9c85a401`);
                    setUserData(userRes);
                    //console.log('user get', userRes)
                } catch (error) {
                    console.log(error)
                }
            })()
    },[])

    let buttonStyle={borderRadius:"20px", fontSize:"14px"}

  return (
    <div className='listitng-post container'>
            <div className='row col-12'>
            <div className='left col-lg-8 col-md-12'>
                <div className='your-story border-bottom p-2 mt-5 mb-2'>
                    <div className='d-flex justify-content-between mb-3'>
                    <h1>Your Story</h1>
                     <div className='d-flex justify-content-between'>
                        <button className='btn btn-success m-3' style={buttonStyle} >Write a Story</button>
                        <button className='btn btn-danger m-3' style={buttonStyle} >Import a Story</button>
                     </div>
                    </div>
                    <div className='d-flex justify-content-between w-50'>
                        <div>Drafts</div>
                        <div>Published</div>
                        <div>Responses</div>
                    </div>
                </div>
                <div className='list-of-stroy'>
                    {postData && postData?.map((item,index)=>{
                        return <StoryCard
                        autherId={item.authorId}
                        key={item.id}
                        id={item.id}
                        user={currentUser}
                        title={item.title}
                        story={item.story}
                        createdAt={item.createdAt}
                        />
                    })}
                </div>
            </div>
            <div className='right col-lg-4 col-md-0' style={{borderLeft:"0.5px solid lightgrey"}}>
                <h4>recommended</h4>
            </div>
            </div>
        <div></div>
    </div>
  )
}

export default OurStory;