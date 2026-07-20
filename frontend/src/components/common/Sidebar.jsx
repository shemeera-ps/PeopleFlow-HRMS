import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ isCollapsed = false, toggleSidebar }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: "📊", to: "/dashboard" },
    { name: "Employees", icon: "👥", to: "/employees" },
    { name: "Attendance", icon: "📅", to: "/attendance" },
    {
      name: "Leave Requests",
      icon: "✉️",
      to: "/leaves",
      children: [
        { name: "All Requests", to: "/leaves" },
        { name: "Pending Approval", to: "/leaves/pending" },
        { name: "Leave Calendar", to: "/leaves/calendar" },
        { name: "Leave Types", to: "/leaves/types" },
      ],
    },
    {
      name: "Payroll",
      icon: "💵",
      to: "/payroll",
      children: [
        { name: "Payslips", to: "/payroll/payslips" },
        { name: "Salary Structure", to: "/payroll/structure" },
        { name: "Tax Settings", to: "/payroll/tax" },
      ],
    },
    {
      name: "Settings",
      icon: "⚙️",
      to: "/settings",
      children: [{ name: "Change Password", to: "/settings/change-password" }],
    },
  ];

  // Track which parent items are expanded (multiple can be open at once)
  const [openMenus, setOpenMenus] = useState(() => {
    // Auto-expand a parent if the current route matches one of its children
    const initial = {};
    navItems.forEach((item) => {
      if (
        item.children?.some((child) => location.pathname.startsWith(child.to))
      ) {
        initial[item.name] = true;
      }
    });
    return initial;
  });

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isParentActive = (item) =>
    item.children?.some((child) => location.pathname.startsWith(child.to));

  return (
    <aside
      className={`fixed top-14 left-0 h-[calc(100vh-4rem)] bg-slate-800 text-slate-100 flex flex-col transition-all duration-300 shadow-xl border-r border-slate-700 z-40
        ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Toggle Header Button */}
      <div
        className={`p-4 flex items-center border-b border-slate-700 ${isCollapsed ? "justify-center" : "justify-end"}`}
      >
        <button
          onClick={toggleSidebar}
          className="p-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-bold cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus[item.name];
          const parentActive = isParentActive(item);

          return (
            <div key={item.name} className="relative group">
              {hasChildren ? (
                // Parent item with children: button toggles submenu instead of navigating
                <button
                  type="button"
                  onClick={() => {
                    if (isCollapsed) return; // handled via flyout when collapsed
                    toggleMenu(item.name);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors relative
                    ${parentActive ? "bg-slate-700" : ""}`}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span
                    className={`flex-1 text-left transition-opacity duration-200 font-medium whitespace-nowrap
                      ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                  >
                    {item.name}
                  </span>
                  {!isCollapsed && (
                    <span
                      className={`text-xs transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  )}

                  {/* Tooltip label when collapsed */}
                  {isCollapsed && (
                    <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-md transition-all duration-100 z-50 whitespace-nowrap ml-2 pointer-events-none">
                      {item.name}
                    </span>
                  )}
                </button>
              ) : (
                // Regular leaf item
                <NavLink
                  to={item.to}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors relative"
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span
                    className={`transition-opacity duration-200 font-medium whitespace-nowrap
                      ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                  >
                    {item.name}
                  </span>
                  {isCollapsed && (
                    <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-md transition-all duration-100 z-50 whitespace-nowrap ml-2 pointer-events-none">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              )}

              {/* Submenu — expanded sidebar: inline collapsible list */}
              {hasChildren && !isCollapsed && (
                <div
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="ml-4 mt-1 pl-4 border-l border-slate-600 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap
                          ${isActive ? "bg-slate-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}

              {/* Submenu — collapsed sidebar: flyout panel on hover */}
              {hasChildren && isCollapsed && (
                <div className="absolute left-16 top-0 hidden group-hover:block bg-slate-900 rounded-lg shadow-lg z-50 py-2 min-w-[180px] ml-2">
                  <div className="px-3 py-1 text-xs font-semibold text-slate-400 whitespace-nowrap">
                    {item.name}
                  </div>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm whitespace-nowrap transition-colors
                        ${isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-slate-700 text-center text-xs text-slate-400">
        {!isCollapsed && <p>v1.0.0 © PeopleFlow</p>}
      </div>
    </aside>
  );
}
