import axios from "axios";

export const Updatecontactdetaials=async(id,userId,contactId,typeOfCd,valueOfCd)=>{
    const res=await axios.put(`http://127.0.0.1:20200/api/v1/contact/${userId}/${contactId}/${id}`,{typeOfCd,valueOfCd},{headers: { auth: localStorage.getItem("auth") }})
    return res
}