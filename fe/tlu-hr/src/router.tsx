import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { AppLayout } from "./components/layout/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/tccb/DashboardPage";
import PersonnelListPage from "./pages/tccb/PersonnelListPage";
import PersonnelCreatePage from "./pages/tccb/PersonnelCreatePage";
import PersonnelEditPage from "./pages/tccb/PersonnelEditPage";
import PersonnelDetailPage from "./pages/tccb/PersonnelDetailPage";
import OrganizationPage from "./pages/tccb/OrganizationPage";
import UnitDetailPage from "./pages/tccb/UnitDetailPage";
import ContractListPage from "./pages/tccb/ContractListPage";
import ContractCreatePage from "./pages/tccb/ContractCreatePage";
import TrainingListPage from "./pages/tccb/TrainingListPage";
import TrainingCreatePage from "./pages/tccb/TrainingCreatePage";
import TrainingDetailPage from "./pages/tccb/TrainingDetailPage";
import TrainingEditPage from "./pages/tccb/TrainingEditPage";
import UserListPage from "./pages/admin/UserListPage";
import UserCreatePage from "./pages/admin/UserCreatePage";
import UserEditPage from "./pages/admin/UserEditPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/tccb" element={<Navigate to="/tccb/dashboard" replace />} />
          <Route path="/tccb/dashboard" element={<DashboardPage />} />
          <Route path="/tccb/personnel" element={<PersonnelListPage />} />
          <Route path="/tccb/personnel/new" element={<PersonnelCreatePage />} />
          <Route path="/tccb/personnel/:id" element={<PersonnelDetailPage />} />
          <Route path="/tccb/personnel/:id/edit" element={<PersonnelEditPage />} />
          <Route path="/tccb/organization" element={<OrganizationPage />} />
          <Route path="/tccb/organization/:id" element={<UnitDetailPage />} />
          <Route path="/tccb/contracts" element={<ContractListPage />} />
          <Route path="/tccb/contracts/new" element={<ContractCreatePage />} />
          <Route path="/tccb/training" element={<TrainingListPage />} />
          <Route path="/tccb/training/new" element={<TrainingCreatePage />} />
          <Route path="/tccb/training/:id" element={<TrainingDetailPage />} />
          <Route path="/tccb/training/:id/edit" element={<TrainingEditPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
            <Route path="/admin/users" element={<UserListPage />} />
            <Route path="/admin/users/new" element={<UserCreatePage />} />
            <Route path="/admin/users/:id/edit" element={<UserEditPage />} />
            <Route path="/admin/config/salary" element={<div>Cấu hình lương</div>} />
            <Route path="/admin/config/allowances" element={<div>Cấu hình phụ cấp</div>} />
            <Route path="/admin/config/contracts" element={<div>Cấu hình hợp đồng</div>} />
            <Route path="/admin/config/evaluations" element={<div>Cấu hình đánh giá</div>} />
            <Route path="/admin/config/training-types" element={<div>Loại đào tạo</div>} />
            <Route path="/admin/config/catalogs" element={<div>Danh mục nghiệp vụ</div>} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/tccb/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/tccb/dashboard" replace />} />
    </Routes>
  );
}
