import React from "react";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat/*" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />}/>
    </Routes>
    </>
  );
};

export default App;
