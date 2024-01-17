import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { router } from "@/Routes/Routes";
import { RouterProvider } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </>
);
