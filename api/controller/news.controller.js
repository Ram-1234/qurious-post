import NewsApi from 'newsapi';



export const fetchNews=async(req,res)=>{
    console.log("new called")
    const newsapi = new NewsApi(process.env.REACT_APP_NEWS_API_KEY2);
  try {
       let resp = await newsapi.v2.topHeadlines({
        q: 'ai',
        category: 'technology',
        language: 'en',
        country: 'in'
        })
        console.log({resp});
       res.send(resp)
  } catch (error) {
    console.log(error)
  }
}