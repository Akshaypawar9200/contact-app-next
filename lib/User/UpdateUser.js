import axios from "axios";

export const UpdateUser=async(firstName,lastName,username,id)=>{
    const res=await axios.put(`http://127.0.0.1:20200/api/v1/admin/${id}`,{firstName,lastName,username},{headers: { auth: localStorage.getItem("auth") }})
    return res
}