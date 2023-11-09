import axios from "axios";

export const DeleteContactDeatils=async(userId,contactId,id)=>{
    const res=await axios.delete(`http://127.0.0.1:20200/api/v1/contact/${userId}/${contactId}/${id}`,{headers: { auth: localStorage.getItem("auth") }})
    return res
}