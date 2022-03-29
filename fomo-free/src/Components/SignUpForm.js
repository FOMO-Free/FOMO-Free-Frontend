import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid, Paper, Button, TextField, Alert, AlertTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as yup from "yup";
import axios from "axios";

import schema from "../Validation/SignUpSchema";

const useStyles = makeStyles((theme) => ({
    PapersStyle: {
        height: "40rem",
        width: "30rem",
        margin: "10% auto auto auto",
        zIndex:"2",
        display:"flex",
        flexDirection: "column"
    },
    titleStyle: {
      fontSize: "5rem",
      textAlign: "center",
      margin: "3rem auto 1rem auto"
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
      height: "3rem",
      width: "60%",
      borderRadius: "50px",
      fontSize: "1.75rem"
    }
}));

const initialFormValues = {
  username: "",
  email: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  email: "",
  password: "",
};

const initialDisabled = true;
const formErrored = "none";
const message = "";

export default function SignUpForm() {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formError, setFormError] = useState(formErrored);
  const [errorMessage, setErrorMessage] = useState(message)

  

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

  const registerUser = (newUser) => {
    axios
        .post("https://fomo-free.herokuapp.com/api/auth/register", newUser)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            history.push("/home");
        })
        .catch((err) => {
            console.log(err.response);
            setErrorMessage(err.response.data)
            if(err.response.status = 401){
              setFormError("")
            }
        })
  };

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    registerUser(newUser);
  };
  
  const onSubmit = (evt) => {
    evt.preventDefault();
    formSubmit();
    history.push("/home");
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
            <h2 className={classes.titleStyle}>Sign Up</h2>
        </Grid>

        <Grid item sm={8} xs={12} className={classes.alertStyle}>
          <Alert severity="error" style={{display:formError, margin: "0 auto 1rem auto"}}>
              {errorMessage}
            </Alert>
        </Grid>

        <Grid item sm={8} xs={9} className={classes.textFieldContainer}>
            {/* username */}
            <TextField 
                id="signup-username" 
                className={classes.textFieldStyle} 
                label="Username" 
                placeholder="Enter Username" 
                type="text" value={formValues.username} 
                name="username" 
                onChange={onChange} 
                fullWidth 
                style={{margin: "auto auto 2rem auto"}}
            />

            {/* email */}
            <TextField 
                id="signup-email" 
                className={classes.textFieldStyle} 
                label="Email" 
                placeholder="Enter Email" 
                type="email" 
                value={formValues.email} 
                onChange={onChange} 
                name="email" 
                fullWidth 
                style={{margin: "auto auto 2rem auto"}}
            />

            {/* password */}
            <TextField 
                id="signup-password" 
                className={classes.textFieldStyle} 
                label="Password" 
                placeholder="Enter Password" 
                type="password" 
                name="password" 
                value={formValues.password} 
                onChange={onChange} 
                fullWidth 
                style={{margin: "auto auto 2rem auto"}}
            />
        </Grid>
            
        <Grid item sm={12} xs={12} className={classes.buttonContainerStyle}>
            
            <Button className={classes.ButtonStyle} type="submit" color="primary" variant="contained" disabled={disabled} endIcon={<ArrowForwardIcon />}>
                Register
            </Button>
        </Grid>

        <Grid item sm={12} xs={12} className={classes.buttonContainerStyle}>
            <label style={{ fontSize: "1.5rem" , marginTop: "1rem"}}>
              Already have an account?
              <Link to="/">
                <span> Sign In</span>
              </Link>
            </label>
        </Grid>

      </Grid>
    </Paper>
</form>
  );
}
