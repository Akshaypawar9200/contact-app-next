import axios from "axios";
export const createcontactdetails=async(userId,contactId,typeOfCd,valueOfCd)=>{

   const res=await axios.post(`http://127.0.0.1:20200/api/v1/contact/${userId}/${contactId}`,{typeOfCd,valueOfCd},{headers: { auth: localStorage.getItem("auth") }})

    return res
}           