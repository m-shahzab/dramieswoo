import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedLayout({
  children,
  authentication,
}: {
  children: React.ReactNode;
  authentication: boolean;
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  //   const authStatus = useSelector((state) => state.auth.status);

  const authStatus = false;
  useEffect(() => {
    if (authentication && !authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h2>loading</h2> : <>{children}</>;
}
