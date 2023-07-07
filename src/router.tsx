import React from "react";
import App from "@components/App";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@screens/SignIn";
import Home from "@screens/Home";
import SignUp from "@screens/SignUp";
import My from "@screens/users/My";
import ForgotPw from "@screens/users/ForgotPw";
import PrivateGuardLayout from "@components/layout/PrivateGuardLayout";
import PublicGuardLayout from "@components/layout/PublicGuardLayout";

export interface RouterBase {
  path: string;
  label: string;
  element: JSX.Element;
  withSignIn?: boolean;
}

const routerData: RouterBase[] = [
  {
    path: "",
    label: "Home",
    element: <Home />,
    withSignIn: false,
  },
  {
    path: "signin",
    label: "SignIn",
    element: <SignIn />,
    withSignIn: false,
  },
  {
    path: "signup",
    label: "SignUp",
    element: <SignUp />,
    withSignIn: false,
  },
  {
    path: "forgot-pw",
    label: "Forgot-PW",
    element: <ForgotPw />,
    withSignIn: false,
  },
  // user screens
  {
    path: "user/my",
    label: "My",
    element: <My />,
    withSignIn: true,
  },
];

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routerData.map((router) => {
      if (!router.withSignIn) {
        if (router.label !== "Home") {
          return {
            path: router.path,
            element: <PublicGuardLayout>{router.element}</PublicGuardLayout>,
          };
        } else {
          return {
            path: router.path,
            element: router.element,
          };
        }
      }
      return {
        path: router.path,
        element: <PrivateGuardLayout>{router.element}</PrivateGuardLayout>,
      };
    }),
    // errorElement: <NotFound />,
  },
]);
export default routers;
