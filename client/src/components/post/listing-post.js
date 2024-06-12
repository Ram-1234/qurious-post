import React, { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import StoryCard from './story-card';
import axios from 'axios';

const ListofPosts = () => {
    const [postData, setData]=useState([]);
    const [loading, setLoading]=useState(false);
    const [userData, setUserData]=useState(null);

    console.log('postData', postData);

    useEffect(()=>{
        (async()=>{
            setLoading(true);
            try {
                let res = await  apiRequest.get('/post/posts', {start:0,end:10});
                //console.log('res', res);
                if(res.status){
                    setData(res.data.posts);
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

  return (
    <div className='listitng-post container'>
            <div className='row col-12'>
            <div className='left col-lg-8 col-md-12'>
                <div className='select-topics d-flex justify-content-between border-bottom p-2 mt-5 mb-2'>
                    <div>For you</div>
                    <div>iOS</div>
                    <div>UX Design</div>
                    <div>React</div>
                    <div>Spiritual</div>
                    <div>Leadership</div>
                    <div>Art</div>
                    <div>Web Development</div>
                    <div>Lifestyle</div>
                    <div>Education</div>
                    <div>Coding</div>
                </div>
                <div className='list-of-stroy'>
                    {postData && postData?.map((item,index)=>{
                        return <StoryCard
                        autherId={item.authorId}
                        key={item.id}
                        id={item.id}
                        user={item.user}
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

export default ListofPosts;