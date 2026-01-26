export default function AdminSidebar({ activePage, setActivePage }) {
  const links = [
    { key: "home", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
    { key: "transactions", label: "Transactions" },
    { key: "blogs", label: "Blogs" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-xl font-bold text-black">Admin Panel</div>
        <div className="text-xs text-gray-500 mt-1">Management Console</div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {links.map(link => (
          <button
            key={link.key}
            onClick={() => setActivePage(link.key)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
              ${activePage === link.key
                ? "bg-pink-50 text-pink-700 font-medium border border-pink-100"
                : "text-gray-700 hover:bg-gray-50 hover:text-black"}
            `}
          >
            <div className={`w-1.5 h-6 rounded-full ${activePage === link.key ? 'bg-pink-600' : 'bg-transparent'}`}></div>
            {link.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}