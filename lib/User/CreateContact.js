import axios from "axios";
export const createcontact=async(id,firstName,lastName)=>{

   const res=await axios.post(`http://127.0.0.1:20200/api/v1/user/${id}`,{firstName,lastName},{headers: { auth: localStorage.getItem("auth") }})

    return res
}
