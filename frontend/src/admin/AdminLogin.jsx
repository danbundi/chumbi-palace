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
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-4">
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Admin Portal</h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">Sign in to manage your store</p>
      </div>

      {/* Login Form */}
      <div className="bg-white w-full max-w-md rounded-xl border border-gray-200 shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">Admin Login</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Enter your username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
            <span>Your credentials are securely encrypted</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Admin Dashboard • All rights reserved
        </p>
      </div>
    </div>
  );
}