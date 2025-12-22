import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const token = localStorage.getItem("adminToken");

  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">Admin</div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {["home", "products", "transactions", "orders", "blogs"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 ${
                    activeTab === tab ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex justify-end items-center p-4 bg-white shadow">
          <div className="relative">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Admin Actions ▼</button>
            {/* Dropdown placeholder */}
            <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded hidden group-hover:block">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Add Product</button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Add Blog</button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "home" && (
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg p-6">Total Products: {products.length}</div>
              <div className="bg-white shadow rounded-lg p-6">Total Orders: {orders.length}</div>
              <div className="bg-white shadow rounded-lg p-6">
                Total Transactions: {transactions.length}
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Variants</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.category.join(", ")}</td>
                      <td className="px-4 py-2">{product.variants.map((v) => v.name).join(", ")}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button className="px-2 py-1 bg-gray-200 rounded">Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                        <button className="px-2 py-1 bg-yellow-400 rounded">Add HotSale</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Transactions</h2>
              <ul>
                {transactions.map((t) => (
                  <li key={t._id} className="border-b py-2">
                    {t.phoneNumber} - {t.amount} - {t.status}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              <ul>
                {orders.map((o) => (
                  <li key={o._id} className="border-b py-2">
                    {o.customerPhone} - {o.totalAmount} - {o.status}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Blogs</h2>
              <p>Coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
