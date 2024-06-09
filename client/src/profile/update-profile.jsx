import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/auth-context';

const UpdateProfile = ({email, username, password}) => {
    const [error,setError]=useState('');
    const {currentUser, updateUser} = useContext(AuthContext);

    const navigate= useNavigate()

    const { register, handleSubmit } = useForm({
        defaultValues: {
          username: currentUser.username,
          email: currentUser.email,
          password: ''
        }
      });


    async function onSubmit(data){
        try {
           const res = await apiRequest.put(`/users/${currentUser.id}`,data);
           if(res.status){
            updateUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate("/profile")
           }
        } catch (error) {
            console.error(error)
            setError(error.response.data.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='container w-50'>
        <div className="col-auto">
            <label className="sr-only" for="inlineFormInputGroup">Username</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                <div className="input-group-text">@</div>
                </div>
                <input type="text" {...register('username')} name="username" className="form-control" id="inlineFormInputGroup" placeholder="Username"/>
            </div>
        </div>
        <div className="col-auto">
            <label className="sr-only" for="inlineFormInput">Email</label>
            <input type="email" name="email" {...register('email')} className="form-control mb-2" id="inlineFormInput" placeholder="jane324@gmail.com"/>
        </div>
        <div className="col-auto">
            <label className="sr-only" for="inlineFormInput">Password</label>
            <input type="password" name='password' {...register('password')} className="form-control mb-2" id="inlineFormInput" placeholder="*****"/>
        </div>
        <p>{error}</p>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2">Update Profile</button>
        </div>
    </form>
  )
}

export default UpdateProfile;