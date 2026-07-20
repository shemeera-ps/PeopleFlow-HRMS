import { NavLink } from "react-router-dom";

export default function Sidebar({ isCollapsed = false, toggleSidebar }) {
  const navItems = [
    { name: "Dashboard", icon: "📊", to: "/dashboard" },
    { name: "Employees", icon: "👥", to: "/employees" },
    { name: "Attendance", icon: "📅", to: "/attendance" },
    { name: "Leave Requests", icon: "✉️", to: "/leaves" },
    { name: "Payroll", icon: "💵", to: "/payroll" },
    { name: "Settings", icon: "⚙️", to: "/settings" },
  ];

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

      {/* Navigation Links */}
      {/* <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors group relative`}
          >
            {/* Icon Anchor */}
      {/* <span className="text-xl flex-shrink-0">{item.icon}</span> */}

      {/* Text Label with visibility transition */}
      {/* <span
              className={`transition-opacity duration-200 font-medium whitespace-nowrap
                ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
            >
              {item.name}
            </span> */}

      {/* Hover Tooltip when sidebar is collapsed */}
      {/* {isCollapsed && (
              <span className="absolute left-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-md transition-all duration-100 z-50 whitespace-nowrap ml-2 pointer-events-none">
                {item.name}
              </span>
            )} */}
      {/* </a>
        ))}
      </nav> */}

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors group relative`}
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
        ))}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-slate-700 text-center text-xs text-slate-400">
        {!isCollapsed && <p>v1.0.0 © PeopleFlow</p>}
      </div>
    </aside>
  );
}
