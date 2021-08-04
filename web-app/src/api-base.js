import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { API_URL } from './config/configuration';


export const getMethod = ({ url, authToken }) => {
  return axios.get(API_URL + url, {
    // headers: {
    //   Authorization: authToken,
    //   "Content-Type": "application/json"
    // },
  });
};


export const getIDMethod = ({ url, params }) => {
  return axios.get(API_URL + url, {
    params,
  });
};



export const postMethod = ({ url, formBody, authToken }) => {
  url = API_URL + url;
  return axios({
    method: "post",
    url: url,
    data: formBody,
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: !!authToken ? authToken : null,
    // },
  });
};
