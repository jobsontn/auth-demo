import React, { useState,useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Index from './pages/index';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import Protected from './components/Protected';
import { UserContext } from './components/UserContext';


export default function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(window.localStorage.getItem('user'));
        console.log(user);
        console.log(window.localStorage.getItem('user'));
      },[]);
    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="home" element={<Protected><Home /></Protected>} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}