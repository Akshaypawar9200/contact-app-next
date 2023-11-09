import React, { useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { createcontactdetails as createcontactdetails } from "../../../lib/User/CreateContactDetails";
import ValidationError from "../../../sharedcomponent/error/validationError";
const CreateUsers = ({ handleSubmit }) => {
  const [typeOfCd, setTypeOfCd] = useState("");
  const [valueOfCd, setValueOfCd] = useState("");

  const getTypeOfCd = (e) => {
    setTypeOfCd(e.target.value);
  };
  const getvalueOfCd = (e) => {
    setValueOfCd(e.target.value);
  };

  const handleCreateContactDetails = async (e) => {
    e.preventDefault();
    try {
      if (!isNaN(typeOfCd)) {
        throw new ValidationError("typeOfCd cannot be a number");
      }
      if (typeOfCd == "") {
        throw new ValidationError("plz enter type of cd");
      }
      if (isNaN(valueOfCd)) {
        throw new ValidationError("Value of ContactDetails must be a numberr");
      }

      if (valueOfCd.length !== 10) {
        throw new ValidationError(
          "Value of ContactDetails must have a length of 10"
        );
      }
      if (valueOfCd == "") {
        throw new ValidationError("plz enter Value of contact Details");
      }
      const contactId = localStorage.getItem("contactid");
      const userId = localStorage.getItem("id");
      const response = await createcontactdetails(
        userId,
        contactId,
        typeOfCd,
        valueOfCd
      );
      handleSubmit();
      enqueueSnackbar("contact detail created", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form class="row g-3">
        <div class="col-md-6">
          <label for="typeOfCd" className="form-label">
            Enter Type Of contact details
          </label>
          <input
            type="text"
            className="form-control"
            onChange={getTypeOfCd}
            placeholder="Enter Type Of contact details"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="valueOfCd" className="form-label">
            Enter value Of contact details
          </label>
          <input
            type="text"
            class="form-control"
            onChange={getvalueOfCd}
            placeholder="Enter value Of contact details"
            required
          />
        </div>

        <div class="col-12">
          <button
            className="btn btn-primary"
            onClick={handleCreateContactDetails}
          >
            Create Contact Details
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUsers;
