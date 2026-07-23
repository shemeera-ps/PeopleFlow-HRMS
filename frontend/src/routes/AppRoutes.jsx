import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/Dashboard";
import ChangePassword from "../features/auth/components/ChangePassword";
import ProtectedRoute from "../features/auth/pages/ProtectedRoute";
import PublicRoute from "../features/auth/pages/PublicRoute";
import PageNotFound from "../components/common/PageNotFound";
import { List as EmployeeList } from "../features/employees/components/List";
import { Create as EmployeeCreate } from "../features/employees/components/Create";
import { Edit as EmployeeEdit } from "../features/employees/components/Edit";
import { View as EmployeeView } from "../features/employees/components/View";
import { List as DepartmentList } from "../features/departments/components/List";
import { Create as CreateDepartment } from "../features/departments/components/Create";

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
          <Route path="/employees">
            <Route path="list" element={<EmployeeList />} index />
            <Route path="new" element={<EmployeeCreate />} />
            <Route path="edit/:id" element={<EmployeeEdit />} />
            <Route path="view/:id" element={<EmployeeView />} />
          </Route>
          <Route path="/departments">
            <Route path="list" element={<DepartmentList />} />
            <Route path="new" element={<CreateDepartment />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
