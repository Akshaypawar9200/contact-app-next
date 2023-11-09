'use client'
import React from "react";
import { login as userLogin } from "../lib/User/Login";
import "./globals.css";
import { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ValidationError from "../sharedcomponent/error/validationError";
import { useRouter } from "next/navigation";

const page = () => {

  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const router=useRouter()
  const validateUsername = (e) => {
    setUsername(e.target.value);
  };
  const validatePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
  
      if (userName.length == 0) {
        throw new ValidationError("plz enter username")
      }
      if (password.length == 0) {
        throw new ValidationError("plz enter password")
      }
      if (userName.length > 20) {
        throw new ValidationError("plz enter valid username")
      }
      if (password.length > 10) {
        throw new ValidationError("plz enter valid password")
      }
      const response = await userLogin(userName, password);

      localStorage.setItem("auth", response.headers.auth);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);

      if (!response?.data.id) {
        throw new ValidationError("invalid credential")
     
      }
      if (response.data.isAdmin == true) {
        enqueueSnackbar("login sucess", { variant: "success" });
        router.push("/admin");
      }
      if (response.data.isAdmin == false) {
        enqueueSnackbar("login sucess", { variant: "success" });

        router.push("/user");
      }
    } 
    catch (error) {
      enqueueSnackbar("login failed", { variant: "error" });
    } 
  };
  return (
    <>
 
      <SnackbarProvider autoHideDuration={3000} />
      <div className="login">
        <form action="#">
          <label htmlFor="userName" id="user">
            UserName
          </label>
          <input
            type="text"
            className="userName"
            onChange={validateUsername}
            placeholder="Enter UserName"
          
          />
          <br />
          <label htmlFor="password" id="password">
            Password
          </label>
          <input
            type="password"
            className="password"
            onChange={validatePassword}
           
            placeholder="Enter your password"
          />
          <br />
          <div className="buttons">
            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
