import { Outlet } from "react-router-dom";
import Navbar from "../common/NavBar";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";
import { useState } from "react";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed((collapsed) => !collapsed);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        <main
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer isSidebarCollapsed={isCollapsed} />
    </div>
  );
}
