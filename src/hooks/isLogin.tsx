import React from "react";
import { useAppSelector } from "@/redux/hooks/";

function useIsLogin() {
  const state = useAppSelector((state) => state);
  console.log(state);
}


export default useIsLogin;
