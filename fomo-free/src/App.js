import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useMemo } from "react";

// import PrivateRoute from "./components/PrivateRoute";
import LogIn from "./pages/LogIn";

export default function App() {
  

  return (
    <>
        <Router>
          <Switch>
            <Route path="/" component={LogIn} />
          </Switch>
        </Router>
    </>
  );
}

