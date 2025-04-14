import { Typography } from "@mui/joy";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Login({user}) {

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex items-center justify-center h-100 flex-col">
      <center>
        <button className="login-with-google-btn cursor-pointer" onClick={handleLogin}>Sign in with Google</button>
      </center>
      <div className="mt-[20px]">
        <Typography level="h2" color="neutral">Less Stress With Splitify</Typography>
      </div>
    </div>
  );
}
