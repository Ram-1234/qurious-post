import axios from 'axios';

const apiRequest=axios.create({
    // baseURL:`${process.env.REACT_APP_API_URL}/api`,
    baseURL:`http://localhost:8000/api`,
    withCredentials:true
})

export default apiRequest;