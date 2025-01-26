import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import apiRequest from '../lib/apiRequest.js';

const Register = () => {
  const [errorMsg, setError]=useState();
  const [isLoading, setIsLoading]=useState(false);

  const navigate = useNavigate();
 
  const onSubmitHandle=async function(e){
    e.preventDefault();
    setIsLoading(true)
    let formData = new FormData(e.target);
    let username = formData.get("username");
    let email = formData.get("email");
    let password = formData.get("password");
    //console.log(email,username, password);

    try {
      let resposne = await apiRequest.post('/auth/register',{email,username,password})
      console.log('res', resposne);
      if(resposne.status===200){
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmitHandle} style={styles.formStyle}>
      <h1 className='text-light'>Sign up</h1>
       <div className="mb-3">
            <label htmlFor="exampleInputEmail1" style={styles.textLabelStyle} className="form-label">Username</label>
            <input type="text" name="username" className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp"/>
            {!!0 && <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" style={styles.textLabelStyle} className="form-label">Email ID</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            {!!0 && <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" style={styles.textLabelStyle} className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button disabled={isLoading} type="submit" style={styles.buttonStyle} className="btn btn-primary">Create account</button><br/>
        {errorMsg && <div className='text-danger text-center' style={styles.alreadyAccStyle}>{errorMsg}</div> }
        <label className="mt-2" style={styles.alreadyAccStyle} >Already have an account?{" "} <NavLink to='/login' style={{color:"red"}}>Log in</NavLink></label>
    </form>
  )
}

export default Register;

const styles={
  formStyle:{
    width:"25rem",
    height:"28rem",
    padding:"2rem",
    margin:"2rem",
    zIndex:5,
    borderRadius:"1rem",
    position:"absolute",
    // border: "0.5px solid #fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    // boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  buttonStyle:{
    textTransform:"uppercase",
    width:"100%"
  },
  textLabelStyle:{
    color:"#fff",
    font:"16px",
    fontWeight:"600",
    lineHeight:"1.2rem"
  },
  alreadyAccStyle:{
    width:"100%",
    color:"#717171",
    textAlign:"center",
    fontSize:'12px',
    fontWeight:"400",
  }
}
