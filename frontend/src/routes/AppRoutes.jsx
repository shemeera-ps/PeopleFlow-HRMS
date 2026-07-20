import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/Dashboard";
import ChangePassword from "../features/auth/components/ChangePassword";
import ProtectedRoute from "../features/auth/pages/ProtectedRoute";
import PublicRoute from "../features/auth/pages/PublicRoute";
import PageNotFound from "../components/common/PageNotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/settings/change-password"
            element={<ChangePassword />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
