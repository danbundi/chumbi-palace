export default function AdminTopBar() {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-lg font-semibold text-black">Admin Dashboard</h1>
        <p className="text-xs text-gray-500">Welcome back, Admin</p>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-300 rounded-lg border border-gray-300 transition-colors flex items-center gap-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
          />
        </svg>
        Logout
      </button>
    </header>
  );
}