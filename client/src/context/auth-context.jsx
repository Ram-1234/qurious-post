import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrUser]=useState(JSON.parse(localStorage.getItem('user')));
    const [url, setUrl]=useState('');
    const [modal, setModal]=useState(false);

    const updateUser=(data)=>{
        setCurrUser(data)
    }

    const setURLHandler=(themeURL)=>{
        setUrl(themeURL)
    }

    const setModalHandler=(bool)=>{
        setModal(bool);
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser,updateUser, modal,url, setModalHandler, setURLHandler}}>
            {children}
        </AuthContext.Provider>
    )
}