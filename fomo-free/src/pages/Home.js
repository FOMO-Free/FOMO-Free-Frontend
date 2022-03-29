import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "../Components/SideBar"
import Personal from "../Components/Personal"
import Groups from "../Components/Groups"
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles((theme) => ({
  
}));



export default function Home() {
  const classes = useStyles();


  return (
    <>
        <SideBar/>
        {/* <Router>
          <Switch>
            <Route path="/home" component={Personal} />
            <Route path="/home/:id" component={Groups} />
          </Switch>
        </Router> */}
    </>
  );
}