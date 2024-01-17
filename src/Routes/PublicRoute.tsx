import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
function PublicRoute({ children }: { children: ReactNode }) {
  console.log("publicRoute");
  const isLogin = JSON.parse(localStorage.getItem("isLogin") || "false");
  if (isLogin) return <Navigate to="/" replace />;
  return children;
}
export default PublicRoute;
