import { useState } from "react";
import { useAuth } from "../../features/auth/contexts/AuthContext";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);

  async function handleLogout() {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      <header className="absolute top-0 left-0 w-screen p-4 bg-slate-800 text-slate-100 flex justify-between items-center z-50">
        <h3 className="font-bold text-xl">PeopleFlow HRMS</h3>

        {/* Profile Container */}
        <div className="relative">
          {/* Profile Anchor Button */}
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 hover:text-white focus:outline-none font-medium cursor-pointer"
          >
            <span>Profile</span>
            <span
              className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 border border-gray-100 animate-fadeIn">
              <a
                href="#account"
                className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
              >
                My Account
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
              >
                Settings
              </a>

              <hr className="my-1 border-gray-200" />
              <button
                onClick={() => {
                  console.log("Trying to logg out");
                  setIsLoggingOut(true);
                }}
                className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      {isLoggingOut && (
        <ConfirmationModal
          isOpen={isLoggingOut}
          title="Logging Out"
          message="Are u sure you want to logg out from PeopleFlow HRMS"
          confirmLabel="Logg Out"
          onConfirm={handleLogout}
          onCancel={() => setIsLoggingOut(false)}
        />
      )}
    </>
  );
}
