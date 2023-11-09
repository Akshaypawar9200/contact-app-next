import axios from "axios"

export const  login=async(username,password)=>{

const res=await axios.post(`http://127.0.0.1:20200/api/v1/login`,{password,username})
return res

}