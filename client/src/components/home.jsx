import React, { useEffect, useState } from 'react';
import './home.css';
import thoutsImg from "../assets/amaz.jpeg";
import Button from './button';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';


const Home = () => {
const navigate = useNavigate();
const [user, setUser]=useState(localStorage.getItem('user'));

  let eventHandler=()=>{
    if(user){
      navigate("/posts")
    }else{
      navigate('/login');
    }
  }

  useEffect(()=>{
    //let user = localStorage.getItem('user');
    if(!user){
      localStorage.clear();
    }
  },[])

  const buttonColor={
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: '0.8rem',
    fontWeight: 500,
    borderRadius: "1rem"
  }

  return (
    <div className='home-container'>
      <section className='main_box'>
        <div className='amaz_info'>
          <h1>Learn from experts & explore.</h1>
          <h6>Discover stories, insights, and expertise from writers on any topic, and share your own ideas with amazing people to receive feedback and support!</h6>
          <Button buttonStyle={buttonColor} title={"Let's explore"} callback={eventHandler} />
        </div>
        <div className='amaz_walp'><img src={thoutsImg} alt='thought' /></div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home;