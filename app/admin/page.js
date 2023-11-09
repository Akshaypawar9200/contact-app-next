'use client'
import React, { useEffect, useState } from "react";
import { GetAllUser as getUser } from "../../lib/User/GetAllUser";
import { authorize as authorize } from "../../lib/User/Authorize";
import Table from "../../sharedcomponent/table/Table";
import NavbarComponent from "../../sharedcomponent/navbar/Navbar";
import CreateUser from "../component/createuser/CreateUser";  // Importing CreateUser component
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Modal from "react-bootstrap/Modal";
import { UpdateUser as UpdateUser } from "../../lib/User/UpdateUser";
import { DeleteUser as DeleteUser } from "../../lib/User/DeleteUser";
import './admin.css'
import ValidationError from "../../sharedcomponent/error/validationError";


const page = () => {

  const [count, setCount] = useState(0); 
  const [data, setData] = useState([]); 
  const [limit, setLimit] = useState(1); 
  const [page, setPage] = useState(2); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [username, setUserName] = useState(""); 
  const [id, setId] = useState(); 
  const [updateTable, setUpdateTable] = useState(false); 
  const [filterId, setFilterId] = useState() 
  const [filterFirstName, setFilterFirstName] = useState() 
  const [filterLastName, setFilterLastName] = useState() 
  const [filterAdmin, setFilterAdmin] = useState() 
  const [reset, setReset] = useState(false)
  const getFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const getLastName = (e) => {
    setLastName(e.target.value);
  };

  const getUserName = (e) => {
    setUserName(e.target.value);
  };
  const [verify, setVerify] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle form submission for fetching user data based on filters
  const handleSubmit = async (e) => {
    try {
   
      const params = {
        id: filterId,
        firstName: filterFirstName,
        lastName: filterLastName,
        limit: limit,
        page: page
      }

      const response = await getUser(params);
      setCount((prev) => response?.headers["x-total-count"]);  
      setData((prev) => response.data);  
    } catch (error) {
      
      enqueueSnackbar("error", { variant: "error" });
    }
  };

  // Effect hook to automatically update data when the limit, page, or verify status change
  useEffect(() => {
    if (verify || reset) {
      handleSubmit();
    }
  }, [limit, page, reset, verify]);

  // Function to check user authorization and update the verify status
  const handleUser = async () => {
    const response = await authorize();
    setVerify((prev) => response.data.result);  // Update the user authorization status
  };



  const handleFirstName = (e) => {
    setFilterFirstName(e.target.value)
  };


  const handleLastName = (e) => {
    setFilterLastName(e.target.value)
  };

  // Function to handle the filter button click
  const handleFilterButton = (e) => {
    if (!filterFirstName && !filterLastName && !filterAdmin) {
      enqueueSnackbar("Please enter at least one filter field", { variant: "error" });
      return;
    }
    setPage(prev => 1) 
    handleSubmit(e)
  };

  // Effect hook to automatically fetch data when the updateTable state changes
  useEffect(() => {
    handleSubmit();
  }, [updateTable]);

  // Effect hook to check user authorization when the verify state changes
  useEffect(() => {
    handleUser();
  }, [verify]);

  // Conditional rendering: If user is not authorized, display a message and a link to login
  if (!verify) {
    return (
      <h1>
        <a href="/">Please login</a>
      </h1>
    );
  }

  // Function to handle user data update and open the update modal
  const updateFunction = async (d) => {
    try {
      setShow((prev) => true);

      setFirstName(d.firstName);
      setLastName(d.lastName);
      setUserName(d.username);
      setId(d.id);
    } catch (error) {
      enqueueSnackbar("error", { variant: "error" });
    }
  };

  // Function to handle the update button click and update a user's data
  const updateButton = async (e) => {
    e.preventDefault();
    try {
      if (!isNaN(firstName)) {
       
        throw new ValidationError("First name cannot be a number");
      }
      if (!isNaN(lastName)) {
        throw new ValidationError("lastName cannot be a number");
      }
      if (firstName === '') {
        throw new ValidationError("Please enter first name");
      }
      if (lastName === '') {
        throw new ValidationError("Please enter lastName");
      }
      if (username === '') {
        throw new ValidationError("Please enter username");
      }
      // Call the service to update the user's data
      const res = await UpdateUser(firstName, lastName, username, id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('User updated', { variant: "success" });
      }
      handleClose();
    } catch (error) {
    console.log("error");
    }
  };

  // Function to handle the deletion of a user
  const deleteFunction = async (d) => {
    try {
      // Call the service to delete a user
      const res = await DeleteUser(d.id);
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar("User deleted", { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to reset filter inputs and trigger a reset
  const resetButton = () => {
    try {
      setFilterFirstName(prev => "")
      setFilterLastName(prev => "")
      setPage(1); 
      setLimit(1); 
      setReset((prev) => !prev);
      handleSubmit(); 
    } catch (error) {
     console.log(error);
    }
  }

  
  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <NavbarComponent />
      <CreateUser handleSubmit={handleSubmit} />  {/* Render the CreateUser component */}
      <h1>Total records: {count}</h1>
      <Modal show={show} onHide={handleClose}>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={firstName}
              onChange={getFirstName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={getLastName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={getUserName}
            />
          </div>
          <button className="btn btn-primary" onClick={updateButton}>
            Update User
          </button>
        </form>
      </Modal>
      <div className="parent-filter">
        <div className="form-cont">
          <div>
            <input type="text" placeholder="First Name" onChange={handleFirstName} value={filterFirstName} />
          </div>
          <div>
            <input type="text" placeholder="Last Name" onChange={handleLastName} value={filterLastName} />
          </div>
          <div>
            <select className="form-select" aria-label="Default select example" onChange={e => setFilterAdmin(e.target.value)}>
              <option value="">Admin</option>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div>
            <button onClick={handleFilterButton}>Submit</button>
          </div>
          <div>
            <button type="button" className="btn btn-danger" onClick={resetButton}>Reset</button>
          </div>
        </div>
      </div>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        updateButton={true}
        deleteButton={true}
        viewButton={false}
        updateFunction={updateFunction}
        setShow={setShow}
        deleteFunction={deleteFunction}
      />
    </>
  );
};

// Export the GetAllUser component
export default page;


