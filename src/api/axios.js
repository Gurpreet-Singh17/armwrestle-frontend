import axios from "axios";

export const API = axios.create({
  baseURL: "https://armwrestle-connect-backend.onrender.com/api/v1",
});