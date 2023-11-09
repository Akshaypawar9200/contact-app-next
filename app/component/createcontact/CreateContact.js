import React, { useState } from 'react'
import { createcontact as createcontact } from '../../../lib/User/CreateContact'
import './CreateContact.css'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import ValidationError from '../../../sharedcomponent/error/validationError'
const CreateContact = ({ handleSubmit }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const getFirstName = (e) => {
    setFirstName(e.target.value.toLowerCase());
  }

  const getLastName = (e) => {
    setLastName(e.target.value.toLowerCase());
  }

  const handleCreateContact = async (e) => {
    e.preventDefault()
    try {


      if (firstName == "") {
        throw new ValidationError("plz enter firstname")
      }
      if (lastName == "") {
        throw new ValidationError("plz enter lastname")
      }
      if (!isNaN(firstName)) {
        throw new ValidationError("firstname cannot be number")
      }


      if (!isNaN(lastName)) {
        throw new ValidationError("lastName cannot be number")
      }
      let id = localStorage.getItem("id")
      const response = await createcontact(id, firstName, lastName)
      handleSubmit()
      console.log(response);
      enqueueSnackbar('Contact Created', { variant: "success" })

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <div className="contact">
        <h1>contact page</h1>
      </div>
      <form>
        <div className="main1">
          <div className="main-create">
            <div className="cont">
              <div>
                <input type="text" className="form-control" onChange={getFirstName} placeholder='enter your firstname' required />

                <input type="text" className="form-controls" onChange={getLastName} placeholder='enter your lastName' required />
              </div>
            </div>
            <div class="col-12">
              <button className="createButton" onClick={handleCreateContact}>Create Contact</button>
            </div>
          </div>
        </div>
      </form>

    </>
  )
}

export default CreateContact