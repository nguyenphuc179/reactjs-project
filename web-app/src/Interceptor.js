
import axios from "axios";
 
axios.interceptors.request.use((config) => {
  let authToken = localStorage.getItem("your-token");

  config.headers = ({
    "Content-Type": "application/json",
    Authorization: authToken,
    platform :'nguyentaiphuc',
  });
  return config;
}, (er) => {
  return Promise.reject(er);
});

axios.interceptors.response.use((response) => {
  return response;
}, (er) => {
  return Promise.reject(er);
});