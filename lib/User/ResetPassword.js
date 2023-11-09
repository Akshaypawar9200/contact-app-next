import axios from "axios"

export const  resetPasswordDashboard=async(username,oldPassword,newPassword)=>{

const res=await axios.post(`http://127.0.0.1:20200/api/v1/check/password`,{username,oldPassword,newPassword},{headers: { auth: localStorage.getItem("auth") }})
console.log(res);
return res

}