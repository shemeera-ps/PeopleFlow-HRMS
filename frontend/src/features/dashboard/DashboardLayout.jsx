import { useAuth } from "../auth/contexts/AuthContext";
import Dashboard from "./Dashboard";
import StaffDashboard from "./StaffDashboard";

export default function DashboardLayout() {
  const { user, authUserRole } = useAuth();
  const roleId = authUserRole?.id ?? user?.role_id ?? user?.roles?.[0]?.id;

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {roleId === 1 ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Welcome back, {user?.name ?? "there"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Here's what's happening with your store today.
                </p>
              </div>
            </div>
            <Dashboard />{" "}
          </>
        ) : (
          <StaffDashboard />
        )}
      </div>
    </div>
  );
}
