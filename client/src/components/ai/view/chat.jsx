import React, { useState } from "react";
// import logo from "../../../assets/Chat_Logo.png";
// import loader from "../../../assets/loader.png";
import RunPrompt from "../api/server"
import "./style.css";
// import ReadMore from "./read_more";


const ChatApp = () => {
  const [inputPrompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    try {
      setResponse("");
      e.preventDefault();
      setLoading(true);
      const res = await RunPrompt(inputPrompt);
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

  return (
    <form onSubmit={submitForm} className="container-fluid form_container">
      <img src={'https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif'} alt="logo" className="chat_app_logo" />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }} >
        <img src={'https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif'} loading="lazy" alt="loader" className={loading ? "cg-logo loading" : "cg-logo"} />
        <input
          type="text"
          value={inputPrompt}
          className="input_prompt"
          onChange={(e) => setPrompt(e.target.value)}
          name="prompt"
          placeholder="enter your prompts ?"
          required
          autoComplete="off"
        />
        <input type="submit" value="Ask me" title="ask" className="input_button" />
      </div>
      {/* { <div className="result_title"> <ReadMore text={response} /> </div> } */}
      {loading && <div className="loader_title">Loading...</div>}
    </form>
  );
};

export default ChatApp;