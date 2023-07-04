import React from "react";
import App from "@components/App";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@screens/SignIn";
import Home from "@screens/Home";
import SignUp from "@screens/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      // {
      //   path: "auth",
      //   element: <Auth />,
      // },
    ],
    // errorElement: <NotFound />,
  },
]);
export default router;
