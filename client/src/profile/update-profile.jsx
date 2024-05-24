import React, { useContext, useState } from 'react';
import axios from 'axios';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/auth-context';
import { useForm } from "react-hook-form";

const UpdateProfile = ({email, username, password}) => {
    const [error,setError]=useState('');
    const {currentUser, updateUser} = useContext(AuthContext);

    const { register, handleSubmit } = useForm({
        defaultValues: {
          username: '',
          email: '',
          password: ''
        }
      });
    
    console.log('currentUser', currentUser);


    async function onSubmit(data){
        console.log('data', data);
        //let formData = new FormData(e.currentTarget);
        //e.preventDefault();

        //console.log('formdata', formData);

        let {username, email, password} = Object.entries({});
        console.log(username, email, password)

        try {
           const res = await apiRequest.put(`/users/${currentUser.id}`,{username,email,password}) 
           console.log('res', res);
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='container w-50'>
        <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Username</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                <div class="input-group-text">@</div>
                </div>
                <input type="text" {...register('username')} name="username" class="form-control" id="inlineFormInputGroup" placeholder="Username"/>
            </div>
        </div>
        <div class="col-auto">
            <label class="sr-only" for="inlineFormInput">Email</label>
            <input type="email" name="email" {...register('email')} class="form-control mb-2" id="inlineFormInput" placeholder="jane324@gmail.com"/>
        </div>
        <div class="col-auto">
            <label class="sr-only" for="inlineFormInput">Password</label>
            <input type="password" name='password' {...register('password')} class="form-control mb-2" id="inlineFormInput" placeholder="*****"/>
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-2">Update Profile</button>
        </div>
    </form>
  )
}

export default UpdateProfile;