import axios from "axios";
export const CreateUser=async(firstName,lastName,username,password)=>{

    const res=await axios.post('http://127.0.0.1:20200/api/v1/admin', {firstName,lastName,username,password},{headers: { auth: localStorage.getItem("auth") }})

    return res
}