import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useMemo } from "react";

// import PrivateRoute from "./components/PrivateRoute";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home"

export default function App() {
  

  return (
    <>
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={LogIn} />
          </Switch>
        </Router>
    </>
  );
}

