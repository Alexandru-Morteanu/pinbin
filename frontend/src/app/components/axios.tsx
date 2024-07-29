import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pinbin.onrender.com",
});

export default axiosInstance;
