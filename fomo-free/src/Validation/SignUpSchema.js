import * as yup from "yup";

export default yup.object().shape({
  username: yup.string().required("Name is required").min(2, "Name must be at least 2 characters long"),

  email: yup.string().email("Invalid email format").required("Email is required"),

  password: yup.string().required("Password is required"),
});
