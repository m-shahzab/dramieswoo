import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }: { children: ReactNode }) {
  console.log("privateRoute");
  const isLogin = JSON.parse(localStorage.getItem("isLogin") || "false");
  if (!isLogin) return <Navigate to="/login" replace />;
  return children;
}
export default PrivateRoute;
