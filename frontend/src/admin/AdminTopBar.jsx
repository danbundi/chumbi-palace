export default function AdminTopBar() {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex gap-3">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
