'use client'
import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../sharedcomponent/navbar/Navbar';
import CreateContactDetails from '../component/createcontactdetails/CreateContactDetails'
import Table from '../../sharedcomponent/table/Table';
import { authorize } from "../../lib/User/Authorize";
import { AllContactDetails } from '../../lib/User/GetAllContactDetails';
import { Updatecontactdetaials } from '../../lib/User/UpdateContactDetails';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteContactDeatils } from '../../lib/User/DeleteContactDetails';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import './contactDetails.css';
import ValidationError from '../../sharedcomponent/error/validationError';

const page = () => {
  // State variables for managing data and UI
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(2);
  const [typeOfCd, setTypeOfCd] = useState();
  const [valueOfCd, setValueOfCd] = useState();
  const [filterTypeOfCd, setFilterTypeOfCd] = useState();
  const [filterValueOfCd, setFilterValueOfCd] = useState();
  const [id, setId] = useState();
  const [verify, setVerify] = useState(false);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [reset, setReset] = useState(false);

 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle form submission for filtering contact details
  const handleSubmit = async () => {
    try {
      let userId = localStorage.getItem("id");
      let contactId = localStorage.getItem("contactid");
      const params = {
        typeOfCd: filterTypeOfCd,
        valueOfCd: filterValueOfCd,
        limit: limit,
        page: page
      };
      const response = await AllContactDetails(userId, contactId, params);
      setCount((prev) => response?.headers["x-total-count"]);
      setData((prev) => response.data);
    } catch (error) {
      enqueueSnackbar("error", { variant: "error" });
    }
  };

  // Functions to update filter values
  const getTypeOfCd = async (e) => {
    setTypeOfCd(e.target.value);
  };

  const getValueOfCd = async (e) => {
    setValueOfCd(e.target.value);
  };

  // Functions to handle filter input changes
  const hanedleFilterType = (e) => {
    setFilterTypeOfCd(e.target.value);
  };

  const hanedleFilterValue = (e) => {
    setFilterValueOfCd(e.target.value);
  };

  // Function to apply filters and trigger a search
  const handleFilterBt = () => {
    if (!filterTypeOfCd && !filterTypeOfCd) {
      enqueueSnackbar("Please enter at least one filter field", { variant: "error" });
    }
    setPage((prev) => 1);
    handleSubmit();
  };

  // Effect to fetch data when the component mounts or when filters change
  useEffect(() => {
    if (verify||reset) {
      handleSubmit();
    }
  }, [limit, page, verify]);

  // Function to check user authorization status
  const handleUser = async () => {
    const response = await authorize();
    setVerify(response.data.result);
  };

  // Effects to fetch data and check user authorization when the component mounts
  useEffect(() => {
    handleSubmit();
  }, [updateTable]);

  useEffect(() => {
    handleUser();
  }, []);

 

  // If the user is not authorized, show a login link
  if (!verify) {
    return (
      <h1>
        <a href="/">Please log in</a>
      </h1>
    );
  }

  // Function to handle updating a contact detail
  const updateFunction = async (d) => {
    setShow((prev) => true);
    try {
      setTypeOfCd(d.typeOfCd);
      setValueOfCd(d.valueOfCd);
      setId(d.id);
    } catch (error) {
      enqueueSnackbar("error", { variant: "error" });
    }
  };

  // Function to update a contact detail
  const updateButton = async (e) => {
    e.preventDefault();
    try {
      if (!isNaN(typeOfCd)) {
        throw new ValidationError("Type of ContactDetails cannot be a number");
      }

      if (typeOfCd === "") {
        throw new ValidationError("Please enter Type of ContactDetails");
      }

      if (valueOfCd === "") {
        throw new ValidationError("Please enter valueOfCd ");
      }

      let userId = localStorage.getItem("id");
      let contactId = localStorage.getItem("contactid");
      const res = await Updatecontactdetaials(id, userId, contactId, typeOfCd, valueOfCd);
      console.log(res);
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar("Update successful", { variant: "success" });
      }
      handleClose();
    } catch (error) {
      enqueueSnackbar("Cannot update", { variant: "error" });
    }
  };

  // Function to delete a contact detail
  const deleteFunction = async (d) => {
    try {
      let userId = localStorage.getItem("id");
      let contactId = localStorage.getItem("contactid");
      const res = await DeleteContactDeatils(userId, contactId, d.id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar("Delete successful", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Not deleted", { variant: "error" });
    }
  };

  // Function to reset the filter
  const resetButton = () => {
    try {
      setFilterTypeOfCd((prev) => "");
      setFilterValueOfCd((prev) => "");
      setReset((prev) => !prev);
    } catch (error) {
      // Handle any potential errors
    }
  };

  return (
    <div>
      <SnackbarProvider autoHideDuration={3000} />
      <Modal show={show} onHide={handleClose}>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Type of ContactDetails
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={typeOfCd}
              onChange={getTypeOfCd}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Value of ContactDetails
            </label>
            <input
              type="text"
              className="form-control"
              value={valueOfCd}
              onChange={getValueOfCd}
            />
          </div>
          <button className="btn btn-primary" onClick={updateButton}>
            Update Contact Details
          </button>
        </form>
      </Modal>
      <NavbarComponent />
      <CreateContactDetails handleSubmit={handleSubmit} />

      <div className="main-cd">
        <div>
          <label htmlFor="search" className="search">Search filter</label>
        </div>
        <div className="container">
          <div>
            <input type="text" placeholder="Enter type" onChange={hanedleFilterType} value={filterTypeOfCd} />
          </div>
          <div>
            <input type="text" placeholder="Enter value" onChange={hanedleFilterValue} value={filterValueOfCd} />
          </div>
          <div>
            <button type="button" className="btn btn-primary" onClick={handleFilterBt}>Submit</button>
          </div>
          <div>
            <button type="button" className="btn btn-danger" onClick={resetButton}>Reset</button>
          </div>
        </div>
      </div>

      <h1>Total record: {count}</h1>

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
    </div>
  );
}

export default page;
