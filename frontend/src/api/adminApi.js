import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/admin`

export const checkAdminExists = () => axios.get(`${API_BASE}/exists`);
export const registerAdmin = (data) => axios.post(`${API_BASE}/register`, data);
export const loginAdmin = (data) => axios.post(`${API_BASE}/login`, data);
