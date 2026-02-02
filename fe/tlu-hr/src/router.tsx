import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/tccb/DashboardPage";
import PersonnelListPage from "./pages/tccb/PersonnelListPage";
import PersonnelCreatePage from "./pages/tccb/PersonnelCreatePage";
import PersonnelDetailPage from "./pages/tccb/PersonnelDetailPage";
import OrganizationPage from "./pages/tccb/OrganizationPage";
import UnitDetailPage from "./pages/tccb/UnitDetailPage";
import ContractListPage from "./pages/tccb/ContractListPage";
import TrainingListPage from "./pages/tccb/TrainingListPage";

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
          <Route path="/tccb/organization" element={<OrganizationPage />} />
          <Route path="/tccb/organization/:id" element={<UnitDetailPage />} />
          <Route path="/tccb/contracts" element={<ContractListPage />} />
          <Route path="/tccb/training" element={<TrainingListPage />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/tccb/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/tccb/dashboard" replace />} />
    </Routes>
  );
}
