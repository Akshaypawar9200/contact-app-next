'use client'
import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../sharedcomponent/navbar/Navbar';
import CreateContact from '../component/createcontact/CreateContact';
import Table from '../../sharedcomponent/table/Table';
import { authorize } from '../../lib/User/Authorize'; // Import authorize function
import { GetAllContact } from '../../lib/User/GetAllContact'; // Import GetAllContact function
import { Updatecontact } from '../../lib/User/UpdateContact'; // Import Updatecontact function
import { DeleteContact } from '../../lib/User/DeleteContact'; // Import DeleteContact function
import Modal from 'react-bootstrap/Modal';
// import { Navigate, useNavigate } from 'react-router-dom';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import './user.css';
import ValidationError from '../../sharedcomponent/error/validationError';
import { useRouter } from 'next/navigation';

const page = () => {
//   const navigate = useNavigate();
  const router=useRouter()
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(2);
  const [verify, setVerify] = useState(false);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [updateTable, setUpdateTable] = useState(false);
  const [filterFirstNames, setFilterFirstNames] = useState();
  const [filterLastNames, setFilterLastNames] = useState();
  const [filterId, setFilterId] = useState();
  const [reset, setReset] = useState(false);

  // This function is called when the search filter form is submitted.
  const handleSubmit = async (e) => {
    try {


      let id = localStorage.getItem('id');
      const params = {
        firstName: filterFirstNames,
        lastName: filterLastNames,
        limit: limit,
        page: page,
      };

      // Call the AllContact user service to retrieve contact data based on the search filter.
      const response = await GetAllContact(id, params);

      // Update the count and data state with the fetched data.
      setCount((prev) => response?.headers['x-total-count']);
      setData((prev) => response.data);
    } catch (error) {
      // Handle any errors that occur during the AllContact user service.
      enqueueSnackbar('Error', { variant: 'error' });
      return;
    }
  };

  // Handle changes in the first name input field.
  const getFirstName = (e) => {
    setFirstName(e.target.value);
  };

  // Handle changes in the last name input field.
  const getLastName = (e) => {
    setLastName(e.target.value);
  };

  // This useEffect hook is responsible for fetching data when certain dependencies change.
  useEffect(() => {
    if (verify || reset) {
      handleSubmit();
    }
  }, [limit, page, reset, verify]);

  // This function is called to check if the user is authorized.
  const handleUser = async () => {
    const response = await authorize();
    setVerify(response.data.result);
  };

  // Use useEffect to call the handleUser function when the component mounts.
  useEffect(() => {
    handleUser();
  }, []);

  // Use useEffect to call the handleSubmit function when updateTable state changes.
  useEffect(() => {
    handleSubmit();
  }, [updateTable]);

  // Function to prepare for updating a contact.
  const updateFunction = async (d) => {
    setShow((prev) => true);
    setFirstName(d.firstName);
    setLastName(d.lastName);
    setId(d.id);
  };

  // Function to handle the update of a contact.
  const handleUpdate = async (e) => {
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

      const userId = localStorage.getItem('id');
      const res = await Updatecontact(firstName, lastName, userId, id);
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('Contact updated', { variant: 'success' });
      }
      handleClose();
    } catch (error) {
    console.log(error);
    }
  };

  // Function to delete a contact.
  const deleteFunction = async (d) => {
    try {
      const userId = localStorage.getItem('id');
      const res = await DeleteContact(userId, d.id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('Delete successful', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to view contact details.
  const infoFunction = async (d) => {
    localStorage.setItem('contactid', d.id);
    router.push("/contactdetails");
  };

  // Handle changes in the first name filter input field.
  const getFirstNameForFilter = (e) => {
    setFilterFirstNames(e.target.value);
  };

  // Handle changes in the last name filter input field.
  const getLastNameForFilter = (e) => {
    setFilterLastNames(e.target.value);
  };

  // Handle filter submission.
  const handleFilter = (e) => {
    if (!filterFirstNames && !filterLastNames) {
     
      throw new ValidationError("Please enter data in at least one of the filter fields");
    }
    setPage((prev) => 1);
    handleSubmit(e);
  };


  // Function to reset the filter and fetch all records.
  const handleReset = () => {
    setFilterFirstNames('');
    setFilterLastNames('');
    setPage(1); 
    setLimit(1);
    setReset((prev) => !prev); 
    handleSubmit(); 
  };

  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <Modal show={show} onHide={handleClose}>
        <form>
          <div class="mb-3">
            <label for="firstName" class="form-label">
              FirstName
            </label>
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              value={firstName}
              onChange={getFirstName}
            />
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">
              LastName
            </label>
            <input
              type="text"
              class="form-control"
              value={lastName}
              onChange={getLastName}
            />
          </div>

          <button class="btn btn-primary" onClick={handleUpdate}>
            Update Contact
          </button>
        </form>
      </Modal>
      <NavbarComponent />
      <CreateContact handleSubmit={handleSubmit} />

      <h1>Total Records: {count}</h1>
      <div className="main-contact">
        <div className="contact-cont">
          <div>
            <label htmlFor="search" className="search">
              Search Filter
            </label>
          </div>

          <div>
            <input type="text" placeholder="enter firstname" onChange={getFirstNameForFilter} value={filterFirstNames} />
          </div>

          <div>
            <input type="text" placeholder="enter lastname" onChange={getLastNameForFilter} value={filterLastNames} />
          </div>

          <div>
            <button type="button" onClick={handleFilter}>
              Submit
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
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
        viewButton={true}
        updateFunction={updateFunction}
        setShow={setShow}
        deleteFunction={deleteFunction}
        infoFunction={infoFunction}
      />
    </>
  );
};

export default page;
