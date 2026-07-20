import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import MainLayout from "../../../components/layouts/MainLayout";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h4 className="text-center font-semibold">Loading...Please wait</h4>
        <CircularProgress size={32} color="inherit" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <MainLayout />
    </>
  );
}
