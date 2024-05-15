import React,{useContext, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import apiRequest from '../lib/apiRequest.js';
import { AuthContext } from '../context/auth-context.jsx';


const Login = () => {
  const [isLoading, setIsLoading]=useState(false);
  const [errorMsg, setError]=useState();

  const {updateUser} = useContext(AuthContext);

  const navigate = useNavigate();
 
  const onSubmitHandle=async function(e){
    e.preventDefault();
    setIsLoading(true);
    setError("");
    let formData = new FormData(e.target);
    let username = formData.get("username");
    let password = formData.get("password");

    try {
      let response = await apiRequest.post('auth/login',{username,password})
      //console.log('response', response);
      //localStorage.setItem('user', JSON.stringify(response.data.user));
      updateUser(response.data.user)
      if(response.status===200){
        navigate('/');
      }
    } catch (error) {
      setError(error?.message);
    } finally{
      setIsLoading(false);
    }
  }
  

  return (
    <form onSubmit={onSubmitHandle} style={styles.formStyle}>
      <h1 className='text-light'>Login</h1>
        <div class="mb-3">
            <label for="exampleInputEmail1" style={styles.textLabelStyle} class="form-label">Email ID or Username</label>
            <input type="text" name='username' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            {!!0 && <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>}
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" style={styles.textLabelStyle} class="form-label">Password</label>
            <input type="password" name='password' class="form-control" id="exampleInputPassword1"/>
        </div>
        <div class="mb-3 form-check">
            <label class="form-check-label" style={styles.forgotPassStyle} for="exampleCheck1">Forgot Password?</label>
        </div>
        <button  disabled={isLoading} type="submit" style={styles.buttonStyle} class="btn btn-primary">Log in</button><br/>
        {!!errorMsg?.length && <div className='text-danger text-center' style={styles.alreadyAccStyle}>{errorMsg}</div> }
        <label class="mt-2" style={styles.alreadyAccStyle} >New user?{" "} <NavLink to="/user/register" style={{color:"red"}}>Register now</NavLink></label>
    </form>
  )
}

export default Login;

const styles={
  formStyle:{
    width:"25rem",
    height:"25rem",
    padding:"2rem",
    margin:"2rem",
    zIndex:5,
    borderRadius:"1rem",
    position:"absolute",
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
  forgotPassStyle:{
    color:"#fff",
    fontSize:"13px"
  },
  alreadyAccStyle:{
    width:"100%",
    color:"#717171",
    textAlign:"center",
    fontSize:'12px',
    fontWeight:"400",
  }
}