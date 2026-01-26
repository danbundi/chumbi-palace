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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center max-w-sm">
        <p className="text-gray-700">
          Admin already exists. Go to{" "}
          <a className="text-pink-600 font-medium hover:underline" href="/admin/login">
            login
          </a>.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200 w-full max-w-sm">
        <h2 className="text-xl font-bold text-black mb-4 text-center">Create Admin</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
          
          <input 
            type="password" 
            className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          
          <button 
            type="submit" 
            className="w-full bg-pink-600 text-white py-2.5 rounded font-medium hover:bg-pink-700"
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}