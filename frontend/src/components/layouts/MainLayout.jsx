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
    <>
      <Navbar />
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <Outlet />

      <Footer isSidebarCollapsed={isCollapsed} />
    </>
  );
}
