import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

function ProtectedRoute() {
  const { user } = useAuth();

  // If there is no user, redirect to the login page.
  return user ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;