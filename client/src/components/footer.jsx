import React from 'react';
import "./footer.css";
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className='footer'>
       <span>Help</span>
       <span onClick={()=>navigate("/about")}>About us</span>
       <span>Status</span>
       <span>Terms</span>
       <span>Career</span>
       <span>Support</span>
       {/* <span>Team of Services</span>
       <span>Copyright Policy</span> */}
       <span onClick={()=>navigate("/news")}>News</span>
       <div className='d-flex m-0 justify-content-center align-items-center'>
       
        <i className="footer_icon bi bi-linkedin"></i>
        <i className="footer_icon bi bi-twitter"></i>
        <i className="footer_icon bi bi-github"></i>
        </div>
        <p className='m-0 p-0'>&copy; qurious web post application</p>
      </footer>
  )
}

export default Footer