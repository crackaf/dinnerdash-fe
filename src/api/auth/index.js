import axios from "axios";
import { SERVER_URL } from "../api";

const API = axios.create({ baseURL: SERVER_URL+"/api/auth" });

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

export const signUp = (formData) => API.post("/customerSignup", formData);
export const signIn = (formData) => API.post("/signin", formData);
