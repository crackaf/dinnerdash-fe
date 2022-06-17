import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/restaurants" });

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

export const getAllRestaurants = () => API.get("/");
export const getCurrentRestaurant = (id) => API.get(`/${id}`);
