import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrUser]=useState(JSON.parse(localStorage.getItem('user')));

    const updateUser=(data)=>{
        setCurrUser(data)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser,updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}