import axios from "axios";

//In production, theres no localhost therefore we make it dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api= axios.create({
    baseURL: BASE_URL,
});
export default api;