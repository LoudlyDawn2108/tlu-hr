import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute component that checks if user is authenticated.
 * For now, accepts any truthy value - will integrate with auth store later.
 * If not authenticated, redirects to /auth/login.
 * If authenticated, renders the child routes via Outlet.
 */
export default function ProtectedRoute() {
  // TODO: Integrate with auth store from Task 3
  // For now, placeholder that accepts any truthy value
  const isAuthenticated = true; // Placeholder - will be replaced with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
