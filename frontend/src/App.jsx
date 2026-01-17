import React, { useState } from "react";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppProvider.jsx";
import { Toaster } from 'react-hot-toast'
import OTPInput from "./pages/OTPInput.jsx";

const App = () => {
   const {user,loadingUser} = useAppContext()
  return (
    <>
    <Toaster/>
    <Routes>  
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat/*" element={<Chat user={user}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/otp-input" element={<OTPInput />}/>
    </Routes>
    </>
  );
};

export default App;
