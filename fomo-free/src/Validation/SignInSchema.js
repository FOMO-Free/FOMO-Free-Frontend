import * as yup from "yup";

export default yup.object().shape({
  username: yup.string().required("Name is required").min(2, "Name must be at least 2 characters long"),

  password: yup.string().required("Password is required"),
});
