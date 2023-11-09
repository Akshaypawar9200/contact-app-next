import axios from "axios";

export const GetAllUser = async (params) => {
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/admin`, {
    headers: { auth: localStorage.getItem("auth") },
    params:params
  });
console.log(res)
  return res;
};
