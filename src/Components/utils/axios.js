import axios from "axios";
let apiURL = "https://foodie-backend-rvs.herokuapp.com/";
let token = localStorage.getItem("user");
const myaxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    authorization: `${token}`,
    // authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGRhNGJmMmFjNTcwMTU1NDQzZmVjMSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNjQxOTIzMTE1fQ.D5O3pcj2so6HcmqhHqkps-_guymKHPfcMmKgEzoiMxs`,
  },
});

export default myaxios;
