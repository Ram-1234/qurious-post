import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const Private = (props) => {
    const {Component} = props;
    const {currentUser}=useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!currentUser){
            navigate("/user/login");
        }
    },[])
    
  return (
   <Component/>
  )
}

export default Private