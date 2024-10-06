import React, { useEffect, useState, useContext } from 'react';
import apiRequest from '../../lib/apiRequest';
import NewsCard from './newscard';
import { AuthContext } from '../../context/auth-context';
import Loader from '../loader/loader';
import Footer from "../footer";


const News = () => {
    const [newsData, setNewsdata]=useState([]);
    const { currentUser,loading,setLoading } = useContext(AuthContext);

   const fetchApi=async()=>{
    try {
        setLoading(true);
        let resp = await apiRequest.get("/news/technews");
        if(resp?.status===200){
            setNewsdata(resp?.data?.articles)
            setLoading(false);
        }
    } catch (error) {
        console.log(error)
    }
}

    useEffect(()=>{
        fetchApi()
    },[])

  return (
    <div style={{position:"relative"}}>
        <div className='container-fluid' style={{display:"flex", flexWrap:"wrap", position:"relative"}}>
            {!loading ? newsData.map((item,index)=>(
                <div key={index+'technews'} className='col-lg-4'>
                   <div className='p-2' style={{height:"100%"}}>
                        <NewsCard
                            title={item.title}
                            description={item.description}
                            thumbnail={item.urlToImage} 
                            date={item.publishedAt}
                            author={item.author}
                            content={item.content}
                            url={item.url}
                        />
                   </div>
                </div>
                ))
            :<Loader/>}
        </div>
        <div style={{height:"80px"}}>
        {!loading && <Footer/>}
        </div>
    </div>
    )
}

export default News;