import React, { useState } from 'react';
import { CreateUser as CreateUser } from '../../../lib/User/CreateUser'
import './CreateUser.css';
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ValidationError from '../../../sharedcomponent/error/validationError';

const CreateUsers = ({ handleSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const getFirstName = (e) => {
    setFirstName(e.target.value.toLowerCase());
  };

  const getLastName = (e) => {
    setLastName(e.target.value.toLowerCase());
  };

  const getUserName = (e) => {
    setUserName(e.target.value.toLowerCase());
  };

  const getPassword = (e) => {
    setPassword(e.target.value.toLowerCase());
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
  
      if (firstName === ""){
        throw new ValidationError("plz enter firstname")
       }
    if (!isNaN(firstName)) {
      throw new ValidationError("firstname cannot be number")
    }
  
  
    if (!isNaN(lastName)) {
      throw new ValidationError("lastname cannot be number")
    }
      if (username.length > 20) {
        throw new ValidationError("invalid username")
      }
      if (username === "") {
        throw new ValidationError("plz enter username")
      }
     
      if (lastName === "") {
        throw new ValidationError("plz enter lastname")
      }
      if (password === "") {
        throw new ValidationError("plz enter password")
      }
      if (password.length > 10) {
        throw new ValidationError("invalid password")
      }
      const response = await CreateUser(firstName, lastName, username, password);
      console.log(response);
      enqueueSnackbar('User created', { variant: "success" });
      handleSubmit();
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" onChange={getFirstName} placeholder='Enter your first name' required />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" onChange={getLastName} placeholder='Enter your last name' required />
        </div>
        <div className="col-md-6">
          <label htmlFor="username" className="formlabel" style={{ color: 'black' }}>Username</label>
          <input type="text" className="form-control" onChange={getUserName} placeholder='Enter your username' required />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword4" onChange={getPassword} placeholder='Enter your password' required />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" onClick={handleCreateUser}>Create User</button>
        </div>
      </form>
    </>
  );
};

export default CreateUsers;
