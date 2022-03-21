import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import schema from "../Validation/SignInSchema";
import LogInForm from "../Forms/LogInForm";
import axios from "axios";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;


export default function SignIn() {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

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
        console.log("sad path: ", err);
      })
      .finally(setFormValues(initialFormValues));
  };

  const formSubmit = () => {
    const userInformation = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };

    logInUser(userInformation);
  };

  return (
    <>
      <LogInForm values={formValues} change={inputChange} submit={formSubmit} disabled={disabled} errors={formErrors} />
    </>
  );
}