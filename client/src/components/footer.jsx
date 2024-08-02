import React from 'react';
import "./footer.css";
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='footer'>
       <span>Help</span>
       <span onClick={()=>navigate("/about")}>About us</span>
       <span>Status</span>
       <span>Terms</span>
       <span>Career</span>
       <span>Support</span>
       <span>Team of Services</span>
       <span>Copyright Policy</span>
      </footer>
  )
}

export default Footer