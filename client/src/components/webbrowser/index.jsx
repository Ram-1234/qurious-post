import React, {useState, useEffect} from 'react';
import "./style.css";

const WebBrowser=()=>{
    const [result, setResult]=useState([]);
    const [searchInput, setUserInput]=useState('');

    console.log("searchInput",searchInput);

    useEffect(()=>{

    },[]);

    return(
        <div className='webbrowser-container container'>
            <div className='row websearch-title text-center'>
                <div className='col-lg-12'>
                    <h4>Simple Search Engine</h4>
                </div>
            </div>
            <div className='row websearch-result-box'>
                <div className='col-lg-12'>
                    <div className='webbrowser-results'></div>
                </div>
            </div>
            <div className='row websearch-input-container text-center'>
                <div className='col-lg-12'>
                    <div className='webbrowser-input-wrap d-flex align-items-center justify-content-center'>
                        <textarea value={searchInput} onChange={(e)=>setUserInput(e.target.value)} placeholder='Search your query...' className='pt-2 ' name="websearch-input w-70" rows="4" cols="100" /> <button type='button' className='search-btn w-25'>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebBrowser;