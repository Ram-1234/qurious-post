import React, { useEffect } from 'react';
import './home.css';
import thoutsImg from "../assets/amaz.jpeg";
import Button from './button';
import Footer from './footer';

const Home = () => {

  let eventHandler=()=>{
    alert('event')
  }

  useEffect(()=>{
    localStorage.setItem('user', null);
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
          <h6>Let's Discover stories, thinking, and expertise from writers on any topic. More exciting about you can also share your ideas with amzing people and gets feedback and support!</h6>
          <Button buttonStyle={buttonColor} title={"Let's Continue"} callback={eventHandler} />
        </div>
        <div className='amaz_walp'><img src={thoutsImg} alt='thought' /></div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home;