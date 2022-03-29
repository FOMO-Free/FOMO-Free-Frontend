import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://fomo-free.herokuapp.com/api",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
};