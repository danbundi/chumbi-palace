import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHome() {
  const token = localStorage.getItem("adminToken");
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    transactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [p, o, t] = await Promise.all([
          axios.get("api/api/admin/products", { headers }),
          axios.get("api/api/admin/orders", { headers }),
          axios.get("api/api/admin/transactions", { headers }),
        ]);

        setStats({
          products: p.data.length,
          orders: o.data.length,
          transactions: t.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <StatCard 
        title="Products" 
        value={stats.products} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        }
        color="bg-pink-50"
        textColor="text-pink-600"
      />
      <StatCard 
        title="Orders" 
        value={stats.orders} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        }
        color="bg-blue-50"
        textColor="text-blue-600"
      />
      <StatCard 
        title="Transactions" 
        value={stats.transactions} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        color="bg-green-50"
        textColor="text-green-600"
      />
    </div>
  );
}

function StatCard({ title, value, icon, color, textColor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl sm:text-4xl font-bold text-black">{value}</p>
        </div>
        
        <div className={`${color} p-3 rounded-lg`}>
          <div className={textColor}>
            {icon}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  );
}