import { useState } from "react";
import { useAuth } from "../auth/contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      const response = await logout();
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.message);
      }
    } finally {
      setIsLoggingOut(false);
    }
  }
  return (
    <>
      <h1>Welcome {user?.name ?? "USER"}, I am the Dashboard</h1>
      <button
        className="rounded p-2 "
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        Logout
      </button>
    </>
  );
}
