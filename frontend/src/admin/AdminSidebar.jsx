export default function AdminSidebar({ activePage, setActivePage }) {
  const links = [
    { key: "home", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
    { key: "transactions", label: "Transactions" },
    { key: "blogs", label: "Blogs" },
  ];

  return (
    <aside className="w-64 bg-white shadow">
      <div className="p-6 text-xl font-bold border-b">Admin Panel</div>

      <nav className="p-4 space-y-2">
        {links.map(link => (
          <button
            key={link.key}
            onClick={() => setActivePage(link.key)}
            className={`w-full text-left px-4 py-2 rounded
              ${activePage === link.key
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"}
            `}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
