import React, { useContext } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { AuthContext } from '../context/auth-context';

const PublicRoute = () => {
  
return (
  <div className="App">
    <Outlet/>
  </div>
)
}



const PrivateRoute = () => {
    const {currentUser}=useContext(AuthContext);

    
  return !currentUser?(
    <>
      <Navigate to="/" />
      <Navigate to="/login"/>
    </>
  ):(
    <div className="App">
         <Outlet/>
    </div>
  )
}

export  {PrivateRoute, PublicRoute};