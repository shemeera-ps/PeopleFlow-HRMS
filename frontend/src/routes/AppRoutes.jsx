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
import { List as ListDesignations } from "../features/designations/components/List";
import { Create as CreateDesignations } from "../features/designations/components/Create";
import { List as ListBranches } from "../features/branches/components/List";
import { Create as CreateBranch } from "../features/branches/components/Create";
import { Update as UpdateBranch } from "../features/branches/components/Update";

import { List as ListShifts } from "../features/shifts/components/List";
import { Create as CreateShift } from "../features/shifts/components/Create";
import { Update as UpdateShift } from "../features/shifts/components/Update";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />} />

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
            <Route path="designations/:id" element={<ListDesignations />} />
            <Route
              path="designations/new/:id"
              element={<CreateDesignations />}
            />
          </Route>
          <Route path="/branches">
            <Route path="list" element={<ListBranches />} />
            <Route path="create" element={<CreateBranch />} />
            <Route path="update/:id" element={<UpdateBranch />} />
          </Route>
          <Route path="/shifts">
            <Route path="list" element={<ListShifts />} />
            <Route path="create" element={<CreateShift />} />
            <Route path="update/:id" element={<UpdateShift />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
