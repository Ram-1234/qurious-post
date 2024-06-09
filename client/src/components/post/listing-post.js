import React, { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';

const ListofPosts = () => {
    const [postData, setData]=useState([]);

    useEffect(()=>{
        (async()=>{
            try {
                let res = await  apiRequest.get('/post/posts', {start:0,end:5});
                console.log('res', res);
            } catch (error) {
                console.log(error);
            }
          
        })()
    },[])
  return (
    <div>ListofPosts</div>
  )
}

export default ListofPosts;