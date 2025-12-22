import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/adminApi";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({ username, password });
      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input 
          className="w-full mb-4 p-2 border border-gray-300 rounded" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          className="w-full mb-4 p-2 border border-gray-300 rounded" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
