import axios from "axios"

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Osäker på /api ??
  timeout: 60000,
  withCredentials: true,
})

export default axiosInstance

