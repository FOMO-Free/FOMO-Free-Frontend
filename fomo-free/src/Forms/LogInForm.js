import { Link } from "react-router-dom";
import { Grid, Paper, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Particles from "react-tsparticles";


const useStyles = makeStyles((theme) => ({
  PapersStyle: {
      height: "60vh",
      width: "30rem",
      margin: "10% auto auto auto",
      zIndex:"2",
      display:"flex",
      flexDirection: "column"
  },
  titleStyle: {
    fontSize: "5rem",
    textAlign: "center",
  },
  textFieldStyle: {
    width: "70%",
    padding: "2px",
    
  },
  ButtonStyle: {
    margin: "10rem auto auto auto",
    height: "20%",
    width: "60%",
    borderRadius: "50px",
    fontSize: "1.75rem",
  },
  particles: {
      width: "100%",
      position: "fixed",
      zIndex:"-1",
  }
}));


export default function SignInForm({ values, change, submit, disabled }) {
  const classes = useStyles();
  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    change(name, value);
  };

  const particlesInit = (main) => {
    console.log(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };


  return (
    <div>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          className={classes.particles}
          options={{
            fpsLimit: 120,
            background: {
              color: {
                value: "#99d8e4"
              },
              image: "",
              position: "50% 50%",
              repeat: "no-repeat",
              size: "cover",
              opacity: 1
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#fcbb4e",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
        <form onSubmit={onSubmit} className={classes.Form}>
            <Paper elevation={10} className={classes.PapersStyle}>
                <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                className="loginPage-grid-container"
                >
                <Grid item sm={10} xs={12}>
                    <div className="loginPage-grid-item">
                    <h2 className={classes.titleStyle}>Log In</h2>

                    {/* username */}
                    <TextField
                        className={classes.textFieldStyle}
                        label="Username"
                        placeholder="Enter Username"
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={onChange}
                        fullWidth
                        style={{margin: "auto auto 2rem auto"}}
                    />

                    {/* password */}
                    <TextField
                        className={classes.textFieldStyle}
                        label="Password"
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                        fullWidth
                    />
                    </div>
                </Grid>

                <Grid item sm={10} xs={12}>
                    <div className="loginPage-grid-item" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center", textAlign:"center"}}>
                    <Button
                        className={classes.ButtonStyle}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={disabled}
                        endIcon={<ArrowForwardIcon />}
                        style={{margin:"2rem auto 1rem auto"}}
                    >
                        Log In
                    </Button>

                    <label style={{ fontSize: "1.5rem" }}>
                        New Member? 
                        <Link to="/signup">
                        <span style={{margin:"0 1rem"}}>Sign Up</span>
                        </Link>
                    </label>
                    </div>
                </Grid>
                </Grid>
            </Paper>
        </form>
    </div>
    
  );
}
