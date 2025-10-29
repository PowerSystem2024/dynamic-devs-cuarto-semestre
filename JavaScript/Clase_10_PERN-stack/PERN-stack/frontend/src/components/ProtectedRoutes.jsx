import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ redirectTo, isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace/>;
  }
  return children ? children : <Outlet />;
};