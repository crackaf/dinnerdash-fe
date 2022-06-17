import axios from "axios";
import { SERVER_URL } from "../api";

const API = axios.create({ baseURL: SERVER_URL+"/api/offerings" });

API.interceptors.request.use((req) => {
  console.log("here worling");
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    )}`;
    // console.log(req?.headers);
  }
  return req;
});

export const getAllOfferings = (id) => API.get(`/getAllOfferings/${id}`);
export const getOffering = (restId, id) => API.get(`/${restId}/${id}`);
