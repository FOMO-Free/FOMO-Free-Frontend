import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useMemo } from "react";

// import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

export default function App() {
  

  return (
    <>
        <Router>
          <Switch>
            {/* <Route path="/signup" component={SignUp} /> */}
            <Route path="/" component={LogIn} />
          </Switch>
        </Router>
    </>
  );
}

