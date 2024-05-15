import React from 'react';
import './style.css';

const User =(props)=>{
    console.log('props', props);

    return(
        <div className='homepage'>
        <div className='banner'></div>
            {props.children}
        </div>
    )
}

export default User;