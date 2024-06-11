import React from 'react';
import './style.css';

const User =(props)=>{

    return(
        <div className='homepage'>
        <div className='banner'></div>
            {props.children}
        </div>
    )
}

export default User;