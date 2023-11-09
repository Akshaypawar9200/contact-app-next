import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import React, { useState } from 'react'
import{logout as logout} from '../../lib/User/Logout'
import Modal from 'react-bootstrap/Modal';
import{resetPasswordDashboard as resetPasswordDashboard}from '../../lib/User/ResetPassword'
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useRouter } from 'next/navigation';

const NavbarComponent = () => {
  const router=useRouter()
  const[oldpassword,setOldpassword]=useState("")
  const[newpassword,setNewpassword]=useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let username=localStorage.getItem("username")

    
    const handleLogout=async()=>{
      const response=await logout()
      console.log("logout sucessfully");
      localStorage.clear()
      router.push("/")
    }
    const getOldPassword=(e)=>{
    
      setOldpassword(e.target.value)
    }
    const getNewPassword=(e)=>{
      setNewpassword(e.target.value)
    }
const resetPassword=async(e)=>{
e.preventDefault()
  try {
    setShow(prev=>true)

    
    if(oldpassword==""){

      enqueueSnackbar("plz enter old password", { variant: "error" })
      return
    }
   
    if(newpassword==""){
      enqueueSnackbar("plz enter new password", { variant: "error" })
      return
    }
    
    const res=await resetPasswordDashboard(username,oldpassword,newpassword)
   
    enqueueSnackbar('password reset sucessfully', { variant: "success" })
    setShow(prev=>false)
  } catch (error) {

    enqueueSnackbar("invalid old password", { variant: "error" })
  }
}
const resetModel=(e)=>{
  e.preventDefault()

    setShow(prev=>true)
  
} 
  return (
  <>
      <SnackbarProvider autoHideDuration={3000} />
  <Navbar expand="lg" style={{backgroundColor:"gray"}}>
      <Container fluid className="main">
        <Navbar.Brand href="#" style={{color:"black"}}>ContactApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
    <div className="parts">
        <div>
        <label htmlFor="username"className='user'>Hey!{username}</label>
        </div>
          <div>
          <button type="button" class="btn btn-primary" onClick={resetModel}>reset</button>
          </div>
           <div>
           <Button variant="outline-success"className="btn-logout" onClick={handleLogout}>Logout</Button>
           </div>
          
</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
      <form action="#">
        <label htmlFor="old-Password">Old Password</label><br/>
        <input type="text" onChange={getOldPassword}/><br/>
        <label htmlFor="new-Password">New Password</label><br/>
        <input type="text" onChange={getNewPassword}/><br/>
        <Button variant="primary" onClick={resetPassword}>
          Reset Password
          </Button>
      </form>
     
      </Modal>
  </>
  )
}

export default NavbarComponent




