import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/customers" });

API.interceptors.request.use((req) => {
  console.log("here worling");
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    )}`;
    console.log(req?.headers);
  }
  return req;
});

export const getUserByID = (id) => API.get(`/getUser/${id}`);
export const getUser = () => API.get(`/getUser`);
export const removeMoney = (amount) => API.post(`/removeMoney/${amount}`);
