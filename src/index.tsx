import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "context/authContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthContextProvider>
);
