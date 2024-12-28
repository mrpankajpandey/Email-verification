// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/user", 
});

// Add authentication token if required
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
