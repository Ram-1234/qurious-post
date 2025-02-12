import React, { useEffect, useState } from 'react';
import './home.css';
import thoutsImg from "../assets/amaz.webp";
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

  return (
    <div className='home-container'>
      <section className='main_box'>
        <div className='amaz_info'>
          <h1>Learn from experts & explore.</h1>
          <h6>Discover stories, insights, and expertise from writers on any topic, and share your own ideas with amazing people to receive feedback and support!</h6>
          <Button styleclass="homepage-btn"  title={"Let's explore"} callback={eventHandler} />
        </div>
        <div className='amaz_walp'  ><img src={thoutsImg} alt='thought' loading='lazy' width='350' height="300" /></div>
      </section>
      <Footer styles={{background:"#fff"}}/>
    </div>
  )
}

export default Home;