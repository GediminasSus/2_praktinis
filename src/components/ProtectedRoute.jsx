import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FavoritesProvider from "../context/FavoritesProvider";

function ProtectedRoute() {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <FavoritesProvider key={user.id}>
      <Outlet />
    </FavoritesProvider>
  );
}

export default ProtectedRoute;