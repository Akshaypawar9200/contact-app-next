import axios from "axios";

export const AllContactDetails = async (id,contactid,params) => {
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/contact/${id}/${contactid}`, {
    headers: { auth: localStorage.getItem("auth") },
    params:params
  });

  return res;
};
