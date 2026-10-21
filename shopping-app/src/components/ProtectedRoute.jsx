import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
