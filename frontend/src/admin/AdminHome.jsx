import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHome() {
  const token = localStorage.getItem("adminToken");
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    transactions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const headers = { Authorization: `Bearer ${token}` };

      const [p, o, t] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/products", { headers }),
        axios.get("http://localhost:5000/api/admin/orders", { headers }),
        axios.get("http://localhost:5000/api/admin/transactions", { headers }),
      ]);

      setStats({
        products: p.data.length,
        orders: o.data.length,
        transactions: t.data.length,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard title="Products" value={stats.products} />
      <StatCard title="Orders" value={stats.orders} />
      <StatCard title="Transactions" value={stats.transactions} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
