import React, {useState} from 'react';
import "./ message.css";
import { RunPrompt } from '../api/server';
import Loader from '../../components/loader/loader';
import prompt1 from "./images/Blockchain.svg"
import prompt2 from "./images/Computer_Vision.svg"
import prompt3 from "./images/Data_Science.svg"
import prompt4 from "./images/Robotics_And_Automation.svg"


const AIChat = () => {
    const [inputPrompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);

    let messageBox = document.getElementById('msg_root');
    let scrollDown = document.getElementById('scroll_down');
    let suggestionBox=document.getElementById('suggetion_box_id');
   

     const submitForm = async (e,prompt='') => {
        e.preventDefault();
        setLoading(true);
        setTyping(false);
      try {
        let finalPrompt = inputPrompt || prompt;
        suggestionBox?.classList?.add('suggetion_toggle');
        const resp = await RunPrompt(finalPrompt);
       
       resp && displayAnswer(finalPrompt,resp);
        setLoading(false);
        setPrompt("");
      } catch (error) {
        console.error(error);
        setLoading(false);
        setPrompt("");
      }
    };

    const selectPromptCard=(e)=>{
        //alert('hii')
        let prompt = e.target?.innerText;
        if(prompt?.length){
            submitForm(e,prompt);
        }else{
            console.error('Something went wrong')
        }
           
    }

    //important logic
    document.onclick=function(e){
        let clickedItemClass = e.target.classList[0];
        let questionMessage = e.target.innerText;
        if(!clickedItemClass && questionMessage?.length<100){
            submitForm(e, questionMessage);
        }
    }

    document.onkeydown=function(e){
        // e.preventDefault();
        if(e.key?.toLowerCase()==='enter'){
            let trimedValue = inputPrompt.trim();
            if(trimedValue.length){
                suggestionBox.classList.add('suggetion_toggle');
                submitForm(e);
                setPrompt("");
                setTyping(false);
               }
        }
    }

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
    
        messageBox?.append(div);
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

    const onChangeHandler=(e)=>{
        setTyping(true);
        setPrompt(e.target.value);
    }


  return (
        <div className="chat_form_conatiner">
            <div className="rootBox" id="msg_root"></div>
            {loading && <Loader/>}
            {/* <!-- suggestion messages --> */}
            <div className="suggetion_box  overflow-hidden" id="suggetion_box_id">
                <div className="top_box row">
                {/* <img title="TechSagar" data-title="TechSagar" class="techsagar_logo_icon" src={AipoweredLogo} alt=""/> */}
                <i className='bi bi-robot techsagar_logo_icon'></i>
                <h4 className="suggestion_title" data-title="AI-powered search">
                    AI-Powered Search
                </h4>
                </div>
                {/* <!-- slider -->
                <!-- uk-visible-toggle --> */}
                <div className="uk-position-relative prompt_container">
                    <div className="prompt_box">
                        <div className="col-lg-6 col-sm-12 pt-2 pb-2 col-12">
                            <div className="suggetion_1 suggetionQ">
                                <div className="prompt_icon"><img src={prompt1} alt=""/></div>
                                <p id="question1" onClick={(e)=>selectPromptCard(e)}>
                                Application of Blockchain?.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12 pt-2 pb-2 col-12">
                            <div className="suggetion_2 suggetionQ">
                                <div className="prompt_icon"><img src={prompt2} alt=""/></div>
                                <p id="question2" onClick={(e)=>selectPromptCard(e)}>
                                How to become content writing?.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12 pt-2 pb-2 col-12">
                            <div className="suggetion_3 suggetionQ">
                                <div className="prompt_icon"><img src={prompt3} alt=""/></div>
                                <p id="question3" onClick={(e)=>selectPromptCard(e)}>
                                What is React and javascript?.
                                </p>
                                </div>
                        </div>
                        <div className="col-lg-6 col-sm-12 pt-2 pb-2 col-12">
                            <div className="suggetion_4 suggetionQ">
                                <span className="trending">Trending</span>
                                <div className="prompt_icon"><img src={prompt4} alt=""/></div>
                                <p id="question4" onClick={(e)=>selectPromptCard(e)}>
                                How AI and machine learning changing human life and help full?.
                                </p>
                            </div>
                        </div>
                    </div>
                    <a style={styles.arrowStyle} href='ss'   className="uk-position-center-left">previous</a>
                    <a style={styles.arrowStyle} href='ss' className="uk-position-center-right" >next</a>
                </div>
            </div>
            {/* input text area */}
            <div className="form_container_bottom">
                    <div className="scrollDown" id="scroll_down">
                        <i className="bi bi-arrow-down-circle"></i>
                    </div>
                    <div className="search_area">
                        <div className="container form_box_wrap">
                            <form className='form_chat_ai' method="POST" action="" onSubmit={submitForm}>
                                <span title="New Topic" id="newtopic" className="new_topic"><i className="bi bi-chat-dots"></i></span>
                                <div className="user_input_wrapper">
                                    <textarea id="user_input" onChange={(e)=>onChangeHandler(e)} value={inputPrompt} placeholder="Write your search message" rows="2" cols="40"></textarea>
                                    <button type="submit" id="onsubmit"><i className="bi bi-send" style={{color: typing ? "red":"rgb(245, 139, 139)"}}></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
  )
}

export default AIChat;

const styles={
    arrowStyle:{borderRadius: "50%",background: "transparent",color:"#fff",marginLeft:"0.5rem"}
} 