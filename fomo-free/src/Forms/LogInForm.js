import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Button, TextField, Alert, AlertTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


import { useHistory } from "react-router-dom";
import * as yup from "yup";
import schema from "../Validation/SignInSchema";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  PapersStyle: {
      height: "35rem",
      width: "30rem",
      margin: "10% auto auto auto",
      zIndex:"2",
      display:"flex",
      flexDirection: "column"
  },
  titleStyle: {
    fontSize: "5rem",
    textAlign: "center",
    margin: "3rem auto 2rem auto"
  },
  alertStyle: {
    height: "4rem"
  },
  textFieldContainer: {
    position: "relative"
  },
  textFieldStyle: {
    width: "70%",
    padding: "2px",
    
  },
  buttonContainerStyle: {
    display:"flex", 
    flexDirection:"column", 
    justifyContent:"center", 
    alignContent:"center", 
    textAlign:"center"
  },
  ButtonStyle: {
    margin: "10rem auto auto auto",
    height: "3rem",
    width: "60%",
    borderRadius: "50px",
    fontSize: "1.75rem",
  }
}));

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;
const formErrored = "none"

export default function SignInForm() {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formError, setFormError] = useState(formErrored)

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const logInUser = (userInformation) => {
    axios
      .post("https://fomo-free.herokuapp.com/api/auth/login", userInformation)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response.status = 401){
          setFormError("")
        }
      })
      ;
  };

  const formSubmit = () => {
    const userInformation = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };

    logInUser(userInformation);
  };


  const onSubmit = (evt) => {
    evt.preventDefault();
    formSubmit();
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };


  return (
        <form onSubmit={onSubmit} className={classes.Form} style={{zIndex:"2"}}>
            <Paper elevation={10} className={classes.PapersStyle}>
              <Grid container justifyContent="space-around" alignItems="center">

                <Grid item sm={12} xs={12}>
                    <h2 className={classes.titleStyle}>Log In</h2>
                </Grid>

                <Grid item sm={8} xs={12} className={classes.alertStyle}>
                  <Alert severity="error" style={{display:formError, margin: "0 auto 1rem auto"}}>
                      Email or Password is incorrect
                    </Alert>
                </Grid>

                <Grid item sm={8} xs={9} className={classes.textFieldContainer}>
                    {/* username */}
                    <TextField
                        className={classes.textFieldStyle}
                        label="Username"
                        placeholder="Enter Username"
                        type="text"
                        name="username"
                        value={formValues.username}
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
                        value={formValues.password}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid>
                    
                <Grid item sm={12} xs={12} className={classes.buttonContainerStyle}>
                    
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
                </Grid>

                <Grid item sm={12} xs={12} className={classes.buttonContainerStyle}>
                    <label style={{ fontSize: "1.5rem" }}>
                        New Member? 
                        <Link to="/signup">
                        <span style={{margin:"0 1rem"}}>Sign Up</span>
                        </Link>
                    </label>
                </Grid>

              </Grid>
            </Paper>
        </form>
  );
}
