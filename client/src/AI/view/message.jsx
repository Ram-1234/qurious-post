import React, {useState} from 'react';
import "./ message.css";
import { RunPrompt } from '../api/server';
import Loader from '../../components/loader/loader';

const AIChat = () => {
    const [inputPrompt, setPrompt] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

  
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
      try {
        setResponse("");
        e.preventDefault();
        const res = await RunPrompt(inputPrompt);
        displayAnswer(inputPrompt,res)
        setLoading(false);
        setResponse(res);
        setPrompt("");
      } catch (error) {
        alert("something went wrong!");
        setResponse("");
        setLoading(false);
        setPrompt("");
      }
    };

    let messageBox = document.getElementById('msg_root');
    let scrollDown = document.getElementById('scroll_down');

    function displayAnswer(question, ans){
        let id = Math.random() * 100;
        let div = document.createElement('div');
        div.setAttribute('class', 'wrap_response_msg');
        div.setAttribute('id', id);
        // wrapper for p & h tag element
        let wrapfh = document.createElement('div');
        let wrapfp = document.createElement('div');
        wrapfh.setAttribute('class','message_user_prompt_box')
        wrapfp.setAttribute('class','message_user_response_box')
    
        let htag = document.createElement('h4');
        let ptag = document.createElement('p');
    
        let techSagarIcon = document.createElement('i');

        techSagarIcon.setAttribute('class','bi bi-robot prompt_techsagar_icon');
        techSagarIcon.setAttribute('title','AI');
        
        
        let userIcon = document.createElement('i');
        userIcon.setAttribute('class','bi bi-person-circle prompt_user_icon');
        userIcon.setAttribute('title','You');
    
        htag.innerText = question;
        wrapfh.append(htag,userIcon);
    
        ptag.innerText =  ans.trim();
        wrapfp.append(techSagarIcon,ptag);
    
        div.classList.add('container');
        div.append(wrapfh,wrapfp);
    
        messageBox.append(div);
        div.scrollIntoView({bewhavior:"smooth"});
    }

    messageBox?.addEventListener('scroll', (e)=>{
        let scrollH = e.target.scrollHeight;
        let clientH = e.target.clientHeight;
        let scrollT = e.target.scrollTop;
        if(scrollT+5 < scrollH-clientH){
            scrollDown.classList.add('toggle');
        }else{
            scrollDown.classList.remove('toggle');
        }
    })

    scrollDown?.addEventListener('click', ()=>{
        scrollDown.classList.remove('toggle')
        messageBox.scrollTop = messageBox.scrollHeight;
    })

    document.onkeydown=function(e){
        // e.preventDefault();
        if(e.key?.toLowerCase()==='enter'){
            if(inputPrompt.length){
                submitForm(e);
                setPrompt("");
               }
        }
    }

  return (
        <div className="chat_form_conatiner">
            <div className="rootBox" id="msg_root"></div>
            {loading && <Loader/>}
           <div className="form_container_bottom">
                <div className="scrollDown" id="scroll_down"><i className="bi bi-arrow-down-circle"></i></div>
                    <div className="search_area">
                        <div className="container form_box_wrap">
                            <form className='form_chat_ai' method="POST" action="" onSubmit={submitForm}>
                                <span title="New Topic" id="newtopic" className="new_topic"><i className="bi bi-chat-dots"></i></span>
                                <div className="user_input_wrapper">
                                <textarea id="user_input" onChange={(e)=>setPrompt(e.target.value)} value={inputPrompt} placeholder="Write your search message" rows="2" cols="40"></textarea><button type="submit" id="onsubmit"><i className="bi bi-send"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
  )
}

export default AIChat;