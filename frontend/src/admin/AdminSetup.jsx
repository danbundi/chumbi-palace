import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminExists, registerAdmin } from "../api/adminApi";

export default function AdminSetup() {
  const [exists, setExists] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists().then(res => setExists(res.data.exists));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin({ username, password });
      alert("Admin created successfully");
      navigate("/admin/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating admin");
    }
  };

  if (exists) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="text-gray-700 text-lg">
        Admin already exists. Go to <a className="text-blue-600 underline" href="/admin/login">login</a>.
      </p>
    </div>
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Admin</h2>
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
          Create Admin
        </button>
      </form>
    </div>
  );
}
