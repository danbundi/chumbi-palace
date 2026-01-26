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
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
          <div className="max-w-full">
            {/* Page Header - Shows current page name */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-pink-600 rounded-full"></div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black capitalize">
                  {activePage === "home" ? "Dashboard Overview" : activePage}
                </h1>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                {activePage === "home" 
                  ? "Welcome back! Here's what's happening with your store today."
                  : `Manage your ${activePage} here`
                }
              </p>
            </div>

            {/* Page Content */}
            <div className="rounded-xl">
              {renderPage()}
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400 text-center">
                Admin Dashboard • {new Date().getFullYear()} • All rights reserved
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}