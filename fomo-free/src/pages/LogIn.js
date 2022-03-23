import React from "react";
import LogInForm from "../Forms/LogInForm";
import Particles from "react-tsparticles";
import particlesConfig from "../assets/particles"
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  particles: {
      width: "100%",
      position: "fixed",
      zIndex:"-1",
  }
}));



export default function SignIn() {
  const classes = useStyles();


  const particlesInit = (main) => {
    console.log(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>
      <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          className={classes.particles}
          options={particlesConfig}
        />
      <LogInForm/>
    </>
  );
}