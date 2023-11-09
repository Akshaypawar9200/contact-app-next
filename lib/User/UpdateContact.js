import axios from "axios";

export const Updatecontact=async(firstName,lastName,userId,id)=>{
    const res=await axios.put(`http://127.0.0.1:20200/api/v1/user/${userId}/${id}`,{firstName,lastName},{headers: { auth: localStorage.getItem("auth") }})
    return res
}