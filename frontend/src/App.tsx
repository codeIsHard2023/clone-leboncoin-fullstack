import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { AdDetails } from "./pages/AdDetails";
import { CategoryAds } from "./pages/CategoryAds";
import { NewAdEditor } from "./pages/NewAdEditor";
import { UpdateAdEditor } from "./pages/UpdateAdEditor";
import { SignupPage } from "./pages/Signup";
import { SigninPage } from "./pages/Signin";
import { useQuery } from "@apollo/client";
import { WHOAMI } from "./api/user";
import "./App.css";
import React from "react";

enum AuthStates {
  Authenticated,
  Unauthenticated,
}

function authCheck(
  Component: React.FC,
  authStates: AuthStates[],
  redirection: string = "/"
) {
  return function () {
    const { data } = useQuery(WHOAMI);
    const user = data?.whoAmI;

    // if user is not detected
    if (user === undefined) {
      return null;
    }
    // check in what case component can be rendered
    if (
      // rendering of Signup and Signin pages
      (user === null && authStates.includes(AuthStates.Unauthenticated)) ||
      // for rendering others protected pages
      (user && authStates.includes(AuthStates.Authenticated))
    ) {
      return <Component />;
    }

    return <Navigate to={redirection} replace />;
  };
}

export function App() {
  return (
    <Routes>
      <Route path="/" Component={DefaultLayout}>
        <Route path="/" Component={Home} />
        <Route
          path="/signup"
          Component={authCheck(SignupPage, [AuthStates.Unauthenticated])}
        />
        <Route
          path="/signin"
          Component={authCheck(SigninPage, [AuthStates.Unauthenticated])}
        />
        <Route path="about" Component={About} />
        <Route
          path="/ads/new-ad"
          Component={authCheck(NewAdEditor, [AuthStates.Authenticated])}
        />
        <Route
          path="/ads/:id/update/"
          Component={authCheck(UpdateAdEditor, [AuthStates.Authenticated])}
        />
        <Route path="/ads/:id" Component={AdDetails} />
        <Route path="/categories/:id" Component={CategoryAds} />
        <Route path="*" Component={() => <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
