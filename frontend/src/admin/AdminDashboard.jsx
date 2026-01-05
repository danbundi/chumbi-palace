import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";
import AdminHome from "./AdminHome";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminTransactions from "./AdminTransactions";
import AdminBlogs from "./AdminBlogs";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />;
      case "transactions":
        return <AdminTransactions />;
      case "blogs":
        return <AdminBlogs />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">
        <AdminTopBar />
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
