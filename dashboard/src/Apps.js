

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "./pages"; 
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function Apps() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      
      <ToastContainer limit={1} margin-top="50px" /> 
    </>
  );
}

export default Apps;