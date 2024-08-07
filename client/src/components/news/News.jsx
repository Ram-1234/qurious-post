import React, { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import NewsCard from './newscard';


const News = () => {
    const [newsData, setNewsdata]=useState([]);


   const fetchApi=async()=>{
    //MEDIASTACK
    //     const url = `http://api.mediastack.com/v1/news?access_key = ${process.env.REACT_APP_NEWS_API_KEY1}
    //     &categories = science,-technology&languages='en'&countries= 'in'
    // `
    //const url = `http://api.mediastack.com/v1/news?access_key = 7a50529f7407014fe4154dd0ae6b5d9c&date = 2024-07-30` 

    // const data ={
    //     access_key: process.env.REACT_APP_NEWS_API_KEY,
    //     languages: 'en',
    //     countries: 'in',
    //     categories:'health,-sports,-technology',
    //     limit: 30,
    //     offset: 30,
    //     date:new Date()
    //   }

    // const resp = await axios({url:url,method:"post", data});
    //const resp = await axios.get(url);
    //console.log("resp", resp);

  //NEWS API
  var url = 'https://newsapi.org/v2/top-headlines?' +
//   'q=science&' +
  'from=2024-07-03&' +
  'sortBy=popularity&' +
  'languge=en&'+
  'country=in&'+  
  'category=technology&'+
  'apiKey=7bd67f7199c04c709908808914460baf';

// var req = new Request(url);

// fetch(req)
// .then(function(response) {
// return response.json()
// }).then(data=> console.log("data", data))

    try {
        //API
        let resp = await apiRequest.get("/news/technews");
        if(resp?.status===200){
            setNewsdata(resp?.data?.articles)
        }
    } catch (error) {
        console.log(error)
    }
}

    useEffect(()=>{
        fetchApi()
    },[])

  return (
      <div className='container-fluid' style={{display:"flex", flexWrap:"wrap",}}>
            {!!newsData?.length && newsData.map((item,index)=>(
                <div key={index+'technews'} className='col-lg-4'>
                   <div className='m-2'>
                        <NewsCard
                            title={item.title}
                            description={item.description}
                            thumbnail={item.urlToImage} 
                            date={item.publishedAt}
                            author={item.author}
                            content={item.content}
                        />
                   </div>
                </div>
                ))
            }
      </div>
    )
}

export default News;