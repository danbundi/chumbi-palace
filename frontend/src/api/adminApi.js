import axios from "axios";

const API_BASE = "http://localhost:5000/api/admin"; // change if your backend URL differs

export const checkAdminExists = () => axios.get(`${API_BASE}/exists`);
export const registerAdmin = (data) => axios.post(`${API_BASE}/register`, data);
export const loginAdmin = (data) => axios.post(`${API_BASE}/login`, data);
