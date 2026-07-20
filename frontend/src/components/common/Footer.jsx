export default function Footer({ isSidebarCollapsed = false }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`fixed bottom-0 right-0 h-12 bg-slate-900 text-slate-400 text-sm border-t border-slate-700 flex items-center justify-between px-6 transition-all duration-300 z-30
        ${isSidebarCollapsed ? "left-16" : "left-64"}`}
    >
      {/* Left side copyright */}
      <div>
        <span>© {currentYear} </span>
        <span className="font-semibold text-cyan-500">PeopleFlow HRMS</span>
        <span className="hidden sm:inline">. All rights reserved.</span>
      </div>

      {/* Right side links */}
      <div className="flex items-center gap-6 text-xs">
        <a href="#privacy" className="hover:text-cyan-400 transition-colors">
          Privacy Policy
        </a>
        <a href="#terms" className="hover:text-cyan-400 transition-colors">
          Terms of Service
        </a>
        <a href="#support" className="hover:text-cyan-400 transition-colors">
          Support Desk
        </a>
      </div>
    </footer>
  );
}
